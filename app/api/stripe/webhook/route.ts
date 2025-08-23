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
  console.log('🔔 Webhook received at:', new Date().toISOString())
  
  if (!stripe) {
    console.error('❌ Stripe not configured')
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  console.log('📝 Webhook body length:', body.length)
  console.log('🔐 Webhook signature present:', !!sig)

  if (!sig) {
    console.error('❌ No signature provided')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET || '')
    console.log('✅ Webhook signature verified successfully')
  } catch (error) {
    console.error('❌ Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    console.log(`🎯 Processing webhook event: ${event.type}`)
    console.log('📊 Event data object:', 'id' in event.data.object ? event.data.object.id : 'no id')
    
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        console.log('🛒 Checkout session completed:', session.id)
        console.log('👤 Customer email:', session.customer_email)
        console.log('📋 Session metadata:', JSON.stringify(session.metadata))
        
        // For subscriptions with trial, this event fires when trial starts
        // Update lead with subscription info but keep status as 'trial' until payment
        if (session.metadata?.leadId) {
          console.log('🔄 Updating lead:', session.metadata.leadId, 'to trial status')
          const { error: updateError } = await supabase
            .from('leads')
            .update({
              payment_status: 'trial', // Change to trial status
              stripe_session_id: session.id,
              stripe_customer_id: session.customer as string,
              stripe_subscription_id: session.subscription as string,
              status: 'trial' // Change to trial status
            })
            .eq('id', session.metadata.leadId)

          if (updateError) {
            console.error('❌ Error updating lead trial status:', updateError)
          } else {
            console.log('✅ Lead status updated to trial successfully')
          }

          // Send notification emails
          console.log('📧 Sending trial confirmation emails...')
          const mailjetAuth = btoa(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`)
          
          // Send confirmation email to customer
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
                    Name: 'Luca Vehbiu'
                  },
                  To: [
                    {
                      Email: session.customer_email,
                      Name: session.metadata?.businessName || 'Valued Customer'
                    }
                  ],
                  Subject: `🎉 Welcome! Your 3-Day Trial Has Started`,
                  HTMLPart: `
                    <div style="background: #10b981; color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                      <h2 style="margin: 0; color: white;">🎉 Welcome to Your Website Journey!</h2>
                      <p style="margin: 10px 0 0 0; opacity: 0.9;">Your 3-day trial has started and we'll begin working on your website immediately.</p>
                    </div>
                    
                    <h3>What Happens Next?</h3>
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
                      <h4 style="margin: 0 0 8px 0; color: #0369a1;">📧 Step 1: Confirmation Email (within 5 minutes)</h4>
                      <p style="margin: 0; color: #0c4a6e;">You'll receive this confirmation email shortly.</p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
                      <h4 style="margin: 0 0 8px 0; color: #0369a1;">📞 Step 2: Personal Contact (within 2 hours)</h4>
                      <p style="margin: 0; color: #0c4a6e;">I'll reach out personally to discuss your website details and requirements.</p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
                      <h4 style="margin: 0 0 8px 0; color: #0369a1;">🚀 Step 3: Work Begins (within 24 hours)</h4>
                      <p style="margin: 0; color: #0c4a6e;">I'll start building your professional website during your trial period.</p>
                    </div>
                    
                    <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
                      <h4 style="margin: 0 0 8px 0; color: #0369a1;">📈 Step 4: Regular Updates</h4>
                      <p style="margin: 0; color: #0c4a6e;">You'll receive progress updates throughout the development process.</p>
                    </div>

                    <div style="background: #dcfce7; border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin: 20px 0;">
                      <h3 style="margin: 0 0 8px 0; color: #059669;">🛡️ 3-Day Money-Back Guarantee</h3>
                      <p style="margin: 0; color: #047857;">If you're not completely satisfied within 3 days, you'll receive a full refund - no questions asked.</p>
                    </div>
                    
                    <p style="font-size: 16px; margin: 20px 0;">Thank you for trusting me with your business's online presence. I'm excited to help you succeed!</p>
                    
                    <p style="margin: 20px 0 0 0;">
                      Best regards,<br>
                      <strong>Luca Vehbiu</strong><br>
                      Your Personal Web Developer<br>
                      📧 info@lucavehbiu.com<br>
                      🌐 <a href="https://lucavehbiu.com" style="color: #10b981;">lucavehbiu.com</a>
                    </p>
                  `,
                  TextPart: `Welcome! Your 3-day trial has started. I'll contact you within 2 hours to discuss your website requirements. - Luca`
                }
              ]
            })
          }).then(response => {
            if (response.ok) {
              console.log('✅ Customer confirmation email sent successfully')
            } else {
              console.error('❌ Customer confirmation email failed:', response.status, response.statusText)
            }
          }).catch(error => {
            console.error('❌ Error sending customer confirmation email:', error)
          })

          // Send notification email to admin about new trial
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
                  Subject: `🆕 New Trial Started - ${session.metadata?.businessName || 'New Client'}`,
                  HTMLPart: `
                    <div style="background: #3b82f6; color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                      <h2 style="margin: 0; color: white;">🆕 New Trial Started!</h2>
                      <p style="margin: 10px 0 0 0; opacity: 0.9;">A client has started their 3-day trial subscription.</p>
                    </div>
                    
                    <h3>Trial Details</h3>
                    <ul>
                      <li><strong>Business:</strong> ${session.metadata?.businessName || 'N/A'}</li>
                      <li><strong>Customer Email:</strong> ${session.customer_email}</li>
                      <li><strong>Trial Amount:</strong> €${session.amount_total ? (session.amount_total / 100).toFixed(2) : '0.00'} (will be charged after trial)</li>
                      <li><strong>Lead ID:</strong> ${session.metadata?.leadId || 'N/A'}</li>
                      <li><strong>Session ID:</strong> ${session.id}</li>
                      <li><strong>Subscription ID:</strong> ${session.subscription}</li>
                    </ul>
                    
                    <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
                      <h4 style="color: #92400e; margin-top: 0;">⚡ Action Required</h4>
                      <p style="color: #92400e; margin-bottom: 0;"><strong>Contact them within 2 hours</strong> to discuss requirements and start building their website during the trial period!</p>
                    </div>
                    
                    <p>The client has been sent a confirmation email and is expecting your personal contact within 2 hours.</p>
                  `,
                  TextPart: `New trial started for ${session.metadata?.businessName}. Lead ID: ${session.metadata?.leadId}. Contact client within 2 hours.`
                }
              ]
            })
          }).then(response => {
            if (response.ok) {
              console.log('✅ Admin trial notification email sent successfully')
            } else {
              console.error('❌ Admin trial notification email failed:', response.status, response.statusText)
            }
          }).catch(error => {
            console.error('❌ Error sending trial notification email:', error)
          })
        } else {
          console.log('⚠️ No leadId found in session metadata')
        }
        break

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice
        console.log('Payment succeeded:', invoice.id)
        
        // This is the actual payment after trial or recurring payment
        // Stripe Invoice has subscription property but TS doesn't recognize it in this version
        const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | { id: string } }
        const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
          ? invoiceWithSub.subscription 
          : invoiceWithSub.subscription?.id
          
        if (subscriptionId) {
          const { error: paymentUpdateError } = await supabase
            .from('leads')
            .update({
              payment_status: 'paid',
              status: 'paid'
            })
            .eq('stripe_subscription_id', subscriptionId)

          if (paymentUpdateError) {
            console.error('Error updating payment status:', paymentUpdateError)
          } else {
            // Send payment success notification to admin
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
                    Subject: `💰 Payment Successful - Subscription ${subscriptionId}`,
                    HTMLPart: `
                      <div style="background: #10b981; color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                        <h2 style="margin: 0; color: white;">💰 Payment Successful!</h2>
                        <p style="margin: 10px 0 0 0; opacity: 0.9;">A client's payment has been successfully processed.</p>
                      </div>
                      
                      <h3>Payment Details</h3>
                      <ul>
                        <li><strong>Customer Email:</strong> ${invoice.customer_email}</li>
                        <li><strong>Amount:</strong> €${invoice.amount_paid ? (invoice.amount_paid / 100).toFixed(2) : 'N/A'}</li>
                        <li><strong>Invoice ID:</strong> ${invoice.id}</li>
                        <li><strong>Subscription ID:</strong> ${subscriptionId}</li>
                        <li><strong>Period:</strong> ${new Date(invoice.period_start * 1000).toLocaleDateString()} - ${new Date(invoice.period_end * 1000).toLocaleDateString()}</li>
                      </ul>
                      
                      <p>The client's status has been updated to "paid" in the database.</p>
                    `,
                    TextPart: `Payment successful for subscription ${subscriptionId}. Amount: €${invoice.amount_paid ? (invoice.amount_paid / 100).toFixed(2) : 'N/A'}`
                  }
                ]
              })
            }).catch(error => {
              console.error('Error sending payment success notification:', error)
            })
          }
        }
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