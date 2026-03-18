import axios from 'axios';

export const verifyEmail = async () => {
    try {
        const res = await axios.post(
            'https://api.brevo.com/v3/smtp/email',
            {
                sender: {
                    email: 'raheel31102004@gmail.com'
                },
                to:[{
                        email: 'raheel3g414@gmail.com',
                }]
                ,
                subject: 'testing',
                htmlContent: `
                    <p>Hi</p>`
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

