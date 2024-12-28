import { Module } from '@nestjs/common';
import { OtpController } from './otp.controller';
import { OtpService } from './Provider/otp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [OtpController],
  providers: [OtpService],
  imports: [EmailModule],
})
export class OtpModule {}
