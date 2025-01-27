import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tahmidkhan2596@gmail.com',
                pass: 'rnup zdcj hual qjto'
            }
        });
    }
    async sendOtpEmail(to: string, otp: string) {
        const mailOptions = {
            from: 'tahmidkhan2596@gmail.com', 
            to: to,
            subject: 'Email Confirmation',
            text: `Thank you for Registration to ensure your OTP code is: ${otp}`
        };

        try {
            console.log(`Sending OTP email to ${to} with OTP: ${otp}`);
            await this.transporter.sendMail(mailOptions);
            console.log(`OTP email sent to ${to}`);
        } catch (error) {
            console.error(`Error sending OTP email to ${to}:`, error);
        }
    }

    generateOtp(): string {
        return crypto.randomBytes(3).toString('hex'); 
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
    

}