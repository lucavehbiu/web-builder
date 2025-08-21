import { NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || '',
  apiSecret: process.env.MAILJET_SECRET_KEY || ''
})

export async function POST(request: Request) {
  try {
    const formData = await request.json()

    // Create a formatted email with all the form data
    const emailHtml = `
      <h2>New Website Inquiry from ${formData.businessName}</h2>
      
      <h3>Contact Information</h3>
      <ul>
        <li><strong>Full Name:</strong> ${formData.fullName}</li>
        <li><strong>Email:</strong> ${formData.email}</li>
        <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
      </ul>

      <h3>Business Information</h3>
      <ul>
        <li><strong>Business Name:</strong> ${formData.businessName}</li>
        <li><strong>Industry:</strong> ${formData.industry}</li>
        <li><strong>Business Description:</strong> ${formData.businessDescription}</li>
      </ul>

      <h3>Website Requirements</h3>
      <ul>
        <li><strong>Has Current Website:</strong> ${formData.hasWebsite || 'Not specified'}</li>
        ${formData.currentWebsiteUrl ? `<li><strong>Current Website URL:</strong> ${formData.currentWebsiteUrl}</li>` : ''}
        <li><strong>Pages Needed:</strong> ${formData.neededPages?.join(', ') || 'Not specified'}</li>
        <li><strong>Preferred Domain:</strong> ${formData.preferredDomain || 'Not specified'}</li>
        <li><strong>Has Branding:</strong> ${formData.hasBranding || 'Not specified'}</li>
        <li><strong>Color Scheme:</strong> ${formData.colorScheme || 'Not specified'}</li>
      </ul>

      <h3>Timeline & Details</h3>
      <ul>
        <li><strong>Launch Timeline:</strong> ${formData.launchTimeline || 'Not specified'}</li>
        <li><strong>Content Ready:</strong> ${formData.contentReady || 'Not specified'}</li>
        <li><strong>Special Requirements:</strong> ${formData.specialRequirements || 'None'}</li>
        <li><strong>How They Heard About Us:</strong> ${formData.hearAboutUs || 'Not specified'}</li>
      </ul>

      <hr>
      <p style="color: #666; font-size: 12px;">This inquiry was submitted on ${new Date().toLocaleString()}</p>
    `

    // Send email to you using Mailjet
    const request = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL || 'noreply@lucavehbiu.com',
              Name: 'Luca Website'
            },
            To: [
              {
                Email: 'info@lucavehbiu.com',
                Name: 'Luca Vehbiu'
              }
            ],
            Subject: `New Website Inquiry from ${formData.businessName}`,
            HTMLPart: emailHtml,
            TextPart: `New inquiry from ${formData.businessName}. Please check your email for details.`,
            ReplyTo: {
              Email: formData.email,
              Name: formData.fullName
            }
          }
        ]
      })

    const result = await request
    
    if (!result.body.Messages[0].Status || result.body.Messages[0].Status !== 'success') {
      throw new Error('Failed to send notification email')
    }

    // Send confirmation email to the client
    const confirmationHtml = `
      <h2>Thank you for reaching out, ${formData.fullName}!</h2>
      
      <p>We've received your inquiry for ${formData.businessName} and we're excited to help bring your business into the light.</p>
      
      <p>Here's what happens next:</p>
      <ol>
        <li>Our team will review your requirements within 24 hours</li>
        <li>We'll prepare a customized proposal based on your needs</li>
        <li>You'll receive a follow-up email with next steps</li>
      </ol>
      
      <p>If you have any urgent questions, feel free to reply to this email.</p>
      
      <p>Best regards,<br>
      The Luca Team</p>
      
      <hr>
      <p style="color: #666; font-size: 12px;">This is an automated confirmation. Your inquiry was received on ${new Date().toLocaleString()}</p>
    `

    const confirmationRequest = mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM_EMAIL || 'info@lucavehbiu.com',
              Name: 'Luca'
            },
            To: [
              {
                Email: formData.email,
                Name: formData.fullName
              }
            ],
            Subject: 'Thank you for your inquiry - Luca',
            HTMLPart: confirmationHtml,
            TextPart: `Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours.`
          }
        ]
      })

    await confirmationRequest

    return NextResponse.json(
      { message: 'Email sent successfully' },
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