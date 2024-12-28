import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './Provider/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
  /* imports: [TypeOrmModule.forFeature([EmailModule])],*/
})
export class EmailModule {}
