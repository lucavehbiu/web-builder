import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'edge'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function POST(req: Request) {
  try {
    const formData = await req.json()
    const paymentStatus = formData.paymentStatus || 'pending' // 'paid', 'pending', or 'cancelled'

    // Create a formatted email with all the form data
    const emailContent = {
      businessName: formData.businessName,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '',
      industry: formData.industry,
      businessDescription: formData.businessDescription,
      hasWebsite: formData.hasWebsite || '',
      currentWebsiteUrl: formData.currentWebsiteUrl || '',
      neededPages: Array.isArray(formData.neededPages) ? formData.neededPages.join(', ') : formData.neededPages || '',
      preferredDomain: formData.preferredDomain || '',
      hasBranding: formData.hasBranding || '',
      colorScheme: formData.colorScheme || '',
      launchTimeline: formData.launchTimeline || '',
      contentReady: formData.contentReady || '',
      specialRequirements: formData.specialRequirements || '',
      hearAboutUs: formData.hearAboutUs || '',
      paymentStatus: paymentStatus,
      stripeSessionId: formData.stripeSessionId || '',
      timestamp: new Date().toISOString()
    }

    // Using Mailjet API directly with fetch (Edge-compatible)
    const mailjetAuth = btoa(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`)
    
    // Payment status styling
    const getPaymentStatusHtml = (status: string) => {
      switch (status) {
        case 'paid':
          return '<div style="background: #10b981; color: white; padding: 8px 16px; border-radius: 8px; display: inline-block; font-weight: bold;">✅ PAID - HIGH PRIORITY</div>'
        case 'pending':
          return '<div style="background: #f59e0b; color: white; padding: 8px 16px; border-radius: 8px; display: inline-block; font-weight: bold;">⏳ PAYMENT PENDING</div>'
        case 'cancelled':
          return '<div style="background: #ef4444; color: white; padding: 8px 16px; border-radius: 8px; display: inline-block; font-weight: bold;">❌ PAYMENT CANCELLED</div>'
        default:
          return '<div style="background: #6b7280; color: white; padding: 8px 16px; border-radius: 8px; display: inline-block; font-weight: bold;">📝 CONSULTATION REQUESTED</div>'
      }
    }

    const emailHtml = `
      <h2>New Website Inquiry from ${emailContent.businessName}</h2>
      
      <div style="margin: 20px 0;">
        ${getPaymentStatusHtml(paymentStatus)}
        ${paymentStatus === 'paid' ? '<p style="color: #10b981; font-weight: bold; margin-top: 10px;">🚀 Start working on this project immediately!</p>' : ''}
      </div>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Full Name:</strong> ${emailContent.fullName}</li>
        <li><strong>Email:</strong> ${emailContent.email}</li>
        <li><strong>Phone:</strong> ${emailContent.phone}</li>
      </ul>

      <h3>Business Information</h3>
      <ul>
        <li><strong>Business Name:</strong> ${emailContent.businessName}</li>
        <li><strong>Industry:</strong> ${emailContent.industry}</li>
        <li><strong>Business Description:</strong> ${emailContent.businessDescription}</li>
      </ul>

      <h3>Website Requirements</h3>
      <ul>
        <li><strong>Has Current Website:</strong> ${emailContent.hasWebsite}</li>
        ${emailContent.currentWebsiteUrl ? `<li><strong>Current Website URL:</strong> ${emailContent.currentWebsiteUrl}</li>` : ''}
        <li><strong>Pages Needed:</strong> ${emailContent.neededPages}</li>
        <li><strong>Preferred Domain:</strong> ${emailContent.preferredDomain}</li>
        <li><strong>Has Branding:</strong> ${emailContent.hasBranding}</li>
        <li><strong>Color Scheme:</strong> ${emailContent.colorScheme}</li>
      </ul>

      <h3>Timeline & Details</h3>
      <ul>
        <li><strong>Launch Timeline:</strong> ${emailContent.launchTimeline}</li>
        <li><strong>Content Ready:</strong> ${emailContent.contentReady}</li>
        <li><strong>Special Requirements:</strong> ${emailContent.specialRequirements}</li>
        <li><strong>How They Heard About Us:</strong> ${emailContent.hearAboutUs}</li>
      </ul>

      ${paymentStatus !== 'pending' ? `
      <h3>Payment Information</h3>
      <ul>
        <li><strong>Payment Status:</strong> ${paymentStatus.toUpperCase()}</li>
        ${emailContent.stripeSessionId ? `<li><strong>Stripe Session ID:</strong> ${emailContent.stripeSessionId}</li>` : ''}
      </ul>
      ` : ''}

      <hr>
      <p style="color: #666; font-size: 12px;">This inquiry was submitted on ${new Date().toLocaleString()}</p>
    `

    const mailjetResponse = await fetch('https://api.mailjet.com/v3.1/send', {
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
              Name: 'Luca Website'
            },
            To: [
              {
                Email: 'info@lucavehbiu.com',
                Name: 'Luca Vehbiu'
              }
            ],
            Subject: `New Website Inquiry from ${emailContent.businessName}`,
            HTMLPart: emailHtml,
            TextPart: `New inquiry from ${emailContent.businessName}. Please check your email for details.`,
            ReplyTo: {
              Email: emailContent.email,
              Name: emailContent.fullName
            }
          }
        ]
      })
    })

    if (!mailjetResponse.ok) {
      throw new Error('Failed to send email')
    }

    // Send confirmation email to client based on payment status
    const getConfirmationContent = (status: string, fullName: string, businessName: string) => {
      if (status === 'paid') {
        return {
          subject: `Payment Confirmed - Welcome to Premium Service, ${fullName}!`,
          html: `
            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: white;">🎉 Welcome to Premium Service!</h2>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your payment has been confirmed and your project is now our top priority!</p>
            </div>
            
            <h3>Thank you, ${fullName}!</h3>
            <p>Your payment for the ${businessName} website project has been successfully processed. We're thrilled to work with you!</p>
            
            <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0;">
              <h4 style="color: #166534; margin-top: 0;">🚀 What happens next (Premium timeline):</h4>
              <ol style="color: #166534;">
                <li><strong>Within 2 hours:</strong> Our senior developer will contact you personally</li>
                <li><strong>Within 24 hours:</strong> Project kickoff and development begins</li>
                <li><strong>Regular updates:</strong> You'll receive progress updates every 2-3 days</li>
                <li><strong>Priority support:</strong> Direct line to our team for any questions</li>
              </ol>
            </div>
            
            <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0;">
              <h4 style="color: #1e40af; margin-top: 0;">💡 Remember: 7-Day Guarantee</h4>
              <p style="color: #1e40af; margin-bottom: 0;">If you're not completely satisfied within the first 7 days, you'll get a full refund - no questions asked. We're confident you'll love our work!</p>
            </div>
            
            <p>If you have any questions or want to discuss your project, simply reply to this email.</p>
            
            <p>Best regards,<br>
            <strong>Luca Vehbiu</strong><br>
            Senior Developer & Founder</p>
          `
        }
      } else {
        return {
          subject: `Thank you for your inquiry - Luca`,
          html: `
            <h2>Thank you for reaching out, ${fullName}!</h2>
            
            <p>We've received your inquiry for ${businessName} and we're excited to help bring your business into the light.</p>
            
            <p>Here's what happens next:</p>
            <ol>
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a customized proposal based on your needs</li>
              <li>You'll receive a follow-up email with next steps and payment options</li>
            </ol>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0;">
              <h4 style="color: #92400e; margin-top: 0;">💡 Want to get started faster?</h4>
              <p style="color: #92400e; margin-bottom: 0;">If you're ready to move forward, you can always return to our website and choose the "Pay Now" option to become a priority client with immediate project kickoff!</p>
            </div>
            
            <p>If you have any urgent questions, feel free to reply to this email.</p>
            
            <p>Best regards,<br>
            The Luca Team</p>
          `
        }
      }
    }

    const confirmationContent = getConfirmationContent(paymentStatus, emailContent.fullName, emailContent.businessName)

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
              Name: paymentStatus === 'paid' ? 'Luca Vehbiu' : 'Luca'
            },
            To: [
              {
                Email: emailContent.email,
                Name: emailContent.fullName
              }
            ],
            Subject: confirmationContent.subject,
            HTMLPart: confirmationContent.html,
            TextPart: paymentStatus === 'paid' 
              ? `Payment confirmed! Welcome to premium service. We'll contact you within 2 hours to begin your project.`
              : `Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours.`
          }
        ]
      })
    })

    // Save lead to Supabase
    const { data: savedLead, error: supabaseError } = await supabase
      .from('leads')
      .insert([
        {
          business_name: emailContent.businessName,
          full_name: emailContent.fullName,
          email: emailContent.email,
          phone: emailContent.phone,
          industry: emailContent.industry,
          business_description: emailContent.businessDescription,
          has_website: emailContent.hasWebsite,
          current_website_url: emailContent.currentWebsiteUrl,
          needed_pages: emailContent.neededPages,
          preferred_domain: emailContent.preferredDomain,
          has_branding: emailContent.hasBranding,
          color_scheme: emailContent.colorScheme,
          launch_timeline: emailContent.launchTimeline,
          content_ready: emailContent.contentReady,
          special_requirements: emailContent.specialRequirements,
          hear_about_us: emailContent.hearAboutUs,
          payment_status: emailContent.paymentStatus,
          stripe_session_id: emailContent.stripeSessionId,
          status: paymentStatus === 'paid' ? 'paid' : 'new'
        }
      ])
      .select()

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      // Don't fail the request if Supabase fails - email was still sent
    }

    return NextResponse.json(
      { 
        message: 'Email sent successfully', 
        data: emailContent,
        saved: !supabaseError,
        leadId: savedLead?.[0]?.id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}