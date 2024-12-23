import * as nodemailer from 'nodemailer';

export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tahmidkhan2596@gmail.com',
                pass: 'dgoa ftaa uoce wzvl'
            }
        });
    }

    async sendThankYouEmail(to: string) {
        const mailOptions = {
            from: 'tahmidkhan2596@gmail.com',
            to: to,
            subject: 'Thank You',
            text: 'Thank you for contacting us!'
        };

        await this.transporter.sendMail(mailOptions);
    }
    async sendRegisterYouEmail(to: string) {
        const mailOptions = {
            from: 'tahmidkhan2596@gmail.com',
            to: to,
            subject: 'Registration Succeded!',
            text: 'Thank you for registering on flavor find!'
        };

        await this.transporter.sendMail(mailOptions);
    }
}