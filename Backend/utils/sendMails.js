const transporter  = require("../config/mailer")


const sendMail = async ({to, subject, text, html, attachments}) => {


    try {

        
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to,
        subject,
        text,
        html,
        attachments

    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent', info.response);
    return info
        
    } catch (error) {
        console.error('error sending mail', error)
        throw error
    }
}

module.exports = sendMail