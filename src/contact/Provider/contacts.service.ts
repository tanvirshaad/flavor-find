import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contact } from "../contact.entity";
import CreateContactsDto from "../DTOs/create-contacts.dto";
import { User } from "src/users/user.entity";
import { Injectable } from "@nestjs/common";
import { MailerService } from "src/mailer/provider/mailer.service";


@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly mailerService: MailerService, 
  ) {}

  public async createContact(createContactsDto: CreateContactsDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }
    const newContact = this.contactsRepository.create({
      ...createContactsDto,
      user: user,
    });
    await this.contactsRepository.save(newContact);

    await this.mailerService.sendThankYouEmail(createContactsDto.email); 

    return newContact;
  }

  public async getContacts() {
    return this.contactsRepository.find();
  }

  public async getContactById(id: number) {
    return this.contactsRepository.findOne({ where: { id } });
  }

  public async deleteContact(id: number) {
    return this.contactsRepository.delete({ id });
  }
}

