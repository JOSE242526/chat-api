const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: config.api.mailer,
        pass: config.api.emailPass
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter
