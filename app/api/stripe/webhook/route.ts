import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
}) : null

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update lead with payment information
        if (session.metadata?.leadId) {
          const { error: updateError } = await supabase
            .from('leads')
            .update({
              payment_status: 'paid',
              stripe_session_id: session.id,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: 'paid'
            })
            .eq('id', session.metadata.leadId)

          if (updateError) {
            console.error('Error updating lead payment status:', updateError)
          }

          // Send notification email to admin about successful payment
          const mailjetAuth = btoa(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`)
          
          await fetch('https://api.mailjet.com/v3.1/send', {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${mailjetAuth}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Messages: [
                {
                  From: {
                    Email: process.env.MAILJET_FROM_EMAIL || 'info@lucavehbiu.com',
                    Name: 'Stripe Webhook'
                  },
                  To: [
                    {
                      Email: 'info@lucavehbiu.com',
                      Name: 'Luca Vehbiu'
                    }
                  ],
                  Subject: `🎉 Payment Successful - ${session.metadata?.businessName || 'New Client'}`,
                  HTMLPart: `
                    <div style="background: #10b981; color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                      <h2 style="margin: 0; color: white;">🎉 Payment Confirmed!</h2>
                      <p style="margin: 10px 0 0 0; opacity: 0.9;">A client has successfully completed their payment.</p>
                    </div>
                    
                    <h3>Payment Details</h3>
                    <ul>
                      <li><strong>Business:</strong> ${session.metadata?.businessName || 'N/A'}</li>
                      <li><strong>Customer Email:</strong> ${session.customer_email}</li>
                      <li><strong>Amount:</strong> $${session.amount_total ? (session.amount_total / 100).toFixed(2) : 'N/A'} ${session.currency?.toUpperCase()}</li>
                      <li><strong>Lead ID:</strong> ${session.metadata?.leadId || 'N/A'}</li>
                      <li><strong>Session ID:</strong> ${session.id}</li>
                      <li><strong>Subscription ID:</strong> ${session.subscription}</li>
                    </ul>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
                      <h4 style="color: #92400e; margin-top: 0;">⚡ Action Required</h4>
                      <p style="color: #92400e; margin-bottom: 0;">This is now a HIGH PRIORITY client. Contact them within 2 hours to begin the project!</p>
                    </div>
                    
                    <p>The client's payment has been processed and their lead status has been updated to "paid".</p>
                  `,
                  TextPart: `Payment confirmed for ${session.metadata?.businessName}. Lead ID: ${session.metadata?.leadId}. Contact client within 2 hours.`
                }
              ]
            })
          }).catch(error => {
            console.error('Error sending payment notification email:', error)
          })
        }
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('Recurring payment succeeded:', invoice.id)
        break

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice
        console.log('Payment failed:', failedInvoice.id)
        
        // You could add logic here to handle failed payments
        // For example, send notification emails or update lead status
        break

      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription
        console.log('Subscription cancelled:', subscription.id)
        
        // Update lead status when subscription is cancelled
        const { error: cancelError } = await supabase
          .from('leads')
          .update({
            payment_status: 'cancelled',
            status: 'cancelled'
          })
          .eq('stripe_subscription_id', subscription.id)

        if (cancelError) {
          console.error('Error updating cancelled subscription:', cancelError)
        }
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}