import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'edge'

// Initialize Stripe with API key (only if available)
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-07-30.basil',
}) : null

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    const body = await req.json()
    const { leadId, email, businessName, locale = 'en' } = body

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID || '', // Your subscription price ID
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lucavehbiu.com'}/${locale}/payment-success?session_id={CHECKOUT_SESSION_ID}&lead_id=${leadId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lucavehbiu.com'}/${locale}/payment-cancelled`,
      metadata: {
        leadId: leadId || '',
        businessName: businessName || '',
        locale: locale,
      },
      subscription_data: {
        trial_period_days: 7, // 7-day trial for refund period
        metadata: {
          leadId: leadId || '',
          businessName: businessName || '',
        },
      },
      locale: locale === 'sq' ? 'auto' : locale as Stripe.Checkout.SessionCreateParams.Locale,
    })

    return NextResponse.json({ 
      checkoutUrl: session.url,
      sessionId: session.id 
    })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(req.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    return NextResponse.json({
      status: session.payment_status,
      customerEmail: session.customer_email,
      amountTotal: session.amount_total,
      currency: session.currency,
      subscriptionId: session.subscription,
    })
  } catch (error) {
    console.error('Stripe session retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}