import { NextResponse } from 'next/server'

export const runtime = 'edge'

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_API_KEY || '',
  apiSecret: process.env.MAILJET_SECRET_KEY || ''
})

// Google Sheets setup
async function saveToGoogleSheets(formData: Record<string, string | string[] | undefined>) {
  try {
    // Only proceed if Google Sheets is configured
    if (!process.env.GOOGLE_SHEETS_ID || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      console.log('Google Sheets not configured, skipping...')
      return
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Prepare row data
    const rowData = [
      new Date().toLocaleString(), // Timestamp
      formData.businessName,
      formData.fullName,
      formData.email,
      formData.phone || '',
      formData.industry,
      formData.businessDescription,
      formData.hasWebsite || '',
      formData.currentWebsiteUrl || '',
      Array.isArray(formData.neededPages) ? formData.neededPages.join(', ') : formData.neededPages || '',
      formData.preferredDomain || '',
      formData.hasBranding || '',
      formData.colorScheme || '',
      formData.launchTimeline || '',
      formData.contentReady || '',
      formData.specialRequirements || '',
      formData.hearAboutUs || ''
    ]

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'Sheet1!A:Q', // Columns A to Q
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData],
      },
    })

    console.log('Lead saved to Google Sheets')
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    // Don't throw - we still want to send the email even if Sheets fails
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.json()

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
    const mailRequest = mailjet
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

    const result = await mailRequest
    
    console.log('Mailjet response:', result.body)
    
    // Type assertion for Mailjet response
    const body = result.body as { Messages?: Array<{ Status?: string }> }
    if (!body?.Messages || !body.Messages[0] || body.Messages[0].Status !== 'success') {
      console.error('Mailjet send failed:', result.body)
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

    // Save to Google Sheets (if configured)
    await saveToGoogleSheets(formData)
    
    // Also save to local JSON file for easy access
    await saveLeadToFile(formData)

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