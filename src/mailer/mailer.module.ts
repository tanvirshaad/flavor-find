import { Module } from '@nestjs/common';
import { MailerService } from './Provider/mailer.service';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {}