import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tanvirshaad@gmail.com',
        pass: process.env.password,
      },
    });
  }

  public async sendOtp(email: string, otp: string) {
    const mailOptions = {
      from: 'tanvirshaad@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
