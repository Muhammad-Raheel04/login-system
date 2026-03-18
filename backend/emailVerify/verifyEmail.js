import axios from 'axios';

export const verifyEmail = async (token, email) => {
    try {
        const res = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    email: 'raheel31102004@gmail.com'
                },
                to: [{
                    email: email,
                }]
                ,
                subject: 'Email Verification',
                htmlContent: `
          <p>Hi!</p>
          <p>You recently registered on our website.</p>
          <p>Click the link below to verify your email:</p>
          <a target="_self" href="${process.env.FRONTEND_URL}/verify/${token}">Verify Email</a>
          <p>Thanks!</p>
        `,
            },
            {
                headers: {
                    'api-key': process.env.BREVO_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("Email sent successfully");
    } catch (error) {
        console.log(`Email not sent. Error: ${error?.response?.data?.message}`)
    }
}

