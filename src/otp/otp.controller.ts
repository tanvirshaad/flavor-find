import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './Provider/otp.service';
import { EmailService } from 'src/email/Provider/email.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  @Post('generate')
  async generateOtp(
    @Body('userId') userId: number,
    @Body('email') email: string,
  ) {
    const otp = this.otpService.generateOtp(userId);
    await this.emailService.sendOtp(email, otp);
    return { message: 'OTP sent successfully' };
  }

  @Post('verify')
  async verifyOtp(@Body('userId') userId: number, @Body('otp') otp: string) {
    const isValid = this.otpService.validateOtp(userId, otp);
    if (!isValid) {
      return { message: 'Invalid or expired OTP' };
    }
    return { message: 'OTP verified successfully' };
  }
}
