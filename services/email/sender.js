const sendgridMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config()

class CreateSenderSendGrid {
    async send(message) {
        sendgridMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sendgridMail.send({ ...message, from: 'narizhna.tania@gmail.com' })
    }
}

class CreateSenderNodemailer {
    async send(message) {
        const config = {
          host: 'smtp.meta.ua',
          port: 465,
          secure: true,
          auth: {
            user: 'nodejs@meta.ua',
            pass: process.env.PASSWORD,
          },
        }
        const transporter = nodemailer.createTransport(config)
        return await transporter.sendMail({ ...message, from: 'nodejs@meta.ua' })
      }
}

module.exports = {
    CreateSenderSendGrid,
    CreateSenderNodemailer,
}