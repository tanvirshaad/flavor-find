import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { OffersService } from './Provider/offers.service';
import { CreateOffersDto } from './DTOs/create-offers.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}
  @Post()
  public createOffer(
    @Body() createOfferDto: CreateOffersDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.offerService.createOffer(createOfferDto);
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }

  @Get()
  public getAllOffer() {
    return this.offerService.getOffers();
  }

  @Get('/:id')
  public getOfferById(@Param('id', ParseIntPipe) id: number) {
    return this.offerService.getOfferById(id);
  }

  @Get('/delete/:id')
  public deleteOffer(@Param('id', ParseIntPipe) id: number) {
    return this.offerService.deleteOffer(id);
  }
}
