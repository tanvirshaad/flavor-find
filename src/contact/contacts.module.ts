import { Module, Res } from '@nestjs/common';
import {ContactsController} from './contacts.controller';
import { ContactsService } from './Provider/contacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contact.entity';
import { User } from 'src/users/user.entity';
import { MailerService } from '../mailer/provider/mailer.service';


@Module({
  controllers: [ContactsController],
  providers: [ContactsService, MailerService],
  imports: [TypeOrmModule.forFeature([Contact, User])],
})
export class ContactsModule {}

