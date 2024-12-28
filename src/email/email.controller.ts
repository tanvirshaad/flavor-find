import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './Provider/email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-otp')
  public async sendOtp(@Body() email: string, @Body() otp: string) {
    return await this.emailService.sendOtp(email, otp);
  }
}
