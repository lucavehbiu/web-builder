import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  try {
    const formData = await req.json()

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
      timestamp: new Date().toISOString()
    }

    // Using Mailjet API directly with fetch (Edge-compatible)
    const mailjetAuth = btoa(`${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`)
    
    const emailHtml = `
      <h2>New Website Inquiry from ${emailContent.businessName}</h2>
      
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

    // Send confirmation email to client
    const confirmationHtml = `
      <h2>Thank you for reaching out, ${emailContent.fullName}!</h2>
      
      <p>We've received your inquiry for ${emailContent.businessName} and we're excited to help bring your business into the light.</p>
      
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
              Name: 'Luca'
            },
            To: [
              {
                Email: emailContent.email,
                Name: emailContent.fullName
              }
            ],
            Subject: 'Thank you for your inquiry - Luca',
            HTMLPart: confirmationHtml,
            TextPart: `Thank you for reaching out! We've received your inquiry and will get back to you within 24 hours.`
          }
        ]
      })
    })

    return NextResponse.json(
      { message: 'Email sent successfully', data: emailContent },
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