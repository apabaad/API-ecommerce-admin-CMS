import nodemailer from 'nodemailer'
const send = async (mailInfo) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SMTP,
        port: 587,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    })
    const info = await transporter.sendMail(mailInfo)

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export const emailProcessor = ({ email, otp }) => {
    const link = `${process.env.ROOT_URL}?otp=${otp}&email=${email}`
    console.log('from mail', link)
    const mailObj = {
        from: `"Eshop" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: 'User email verification', // Subject line
        text: 'Hello, click the link to verify', // plain text body
        html: `
        <br/>
        <p>
        Thank you for registration Please follow the link to verify.
        </p>
        <p>
        <a href="${link}">${link}</a>
        </p>
        <br/>
        <p>Kind regards, </p>

        `, // html body
    }

    send(mailObj)
}
export const emailVerificationWelcome = (email) => {
    const mailObj = {
        from: `"Eshop" <${process.env.EMAIL_USER}>`, // sender address
        to: email, // list of receivers
        subject: 'User email verified', // Subject line
        text: 'welcome', // plain text body
        html: `
        <br/>
        <p>
        Thank you for veriication.
        </p>
       
        <br/>
        <p>Kind regards, </p>

        `, // html body
    }

    send(mailObj)
}
