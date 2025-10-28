const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }    
})

console.log("EMAIL:", process.env.USER_EMAIL);
console.log("PASS:", process.env.USER_PASSWORD ? "SET" : "MISSING");


transporter.verify((error, success) => {
    if (error) {
        console.log("Mailer verification failed:", error);
    } else {
        console.log("Mailer is ready to send messages");
    }
})    

module.exports = transporter;