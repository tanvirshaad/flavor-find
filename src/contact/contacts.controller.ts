import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ContactsService } from './Provider/contacts.service';

import CreateContactsDto from "./DTOs/create-contacts.dto";


@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactService: ContactsService) {}

    @Post()
    createContact(@Body() createContactDto: CreateContactsDto, @Body('userId') userId: number) {
        return this.contactService.createContact(createContactDto, userId);
    }

    // @Get()
    // findAll() {
    //     return this.contactService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.contactService.findOne(id);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateContactData: any) {
    //     return this.contactService.update(id, updateContactData);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.contactService.remove(id);
    // }
}
