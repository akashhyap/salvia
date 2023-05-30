// @ts-ignore
export default async function handler(req, res) {
    const { name, email, message } = req.body
  
    const emailData = {
      FromEmail: 'akash@trustseo.co',
      FromName: 'Salvia Extract',
      To: [
        {
          Email: email,
          Name: name,
        },
      ],
      Subject: `New Message From ${name}`,
      HtmlBody: `<p>${message}</p>`,
      TextBody: message,
    }
  
    try {
      const response = await fetch('https://a.klaviyo.com/api/v2/email/send', {
        method: 'POST',
        // @ts-ignore
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.KLAVIYO_API_KEY,
        },
        body: JSON.stringify(emailData),
      })
  
      if (!response.ok) throw new Error('Email not sent.')
  
      res.status(200).json({ message: 'Email sent.' })
    } catch (error) {
      console.error('Error sending email:', error)
      res.status(500).json({ message: 'Error sending email.' })
    }
  }
  