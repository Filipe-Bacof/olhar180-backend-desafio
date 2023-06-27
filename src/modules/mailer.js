const nodemailer = require('nodemailer')

const emailEnv = process.env.MAIL_USERNAME
const passEnv = process.env.MAIL_PASSWORD

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: emailEnv,
    pass: passEnv,
  },
})

module.exports = transporter
