const nodemailer = require('nodemailer');


class MailService {
    constructor() {
        // create data construction
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        }
        );
    }

    async sendActivationMail(to, link) {
        // send mail
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на solve.ege',
            text: '',
            html:
                `
                    <div>
                        <h1>Чтобы активировать аккаунт перейдите по ссылке ниже!</h1>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        });
    }
}


module.exports = new MailService();