import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OffersService } from './Provider/offers.service';
import { CreateOffersDto } from './DTOs/create-offers.dto';
import { JwtAuthGuard } from 'src/users/Guard/jwt.guard';

@Controller('offers')
export class OffersController {
    constructor(private readonly offerService: OffersService) {}
    @Post()
    @UseGuards(JwtAuthGuard)
        public createOffer(@Body() createOfferDto: CreateOffersDto, @Body('restaurantId', ParseIntPipe) restaurantId: number) {
            return this.offerService.createOffer(createOfferDto, restaurantId);
        }

    @Get()
    public getAllOffer() {
        return this.offerService.getOffers();
    }

    @Get('/:id')
    @UseGuards(JwtAuthGuard)
        public getOfferById(@Param('id', ParseIntPipe) id: number) {
            return this.offerService.getOfferById(id);
        }
        
        @Get('/delete/:id')
        @UseGuards(JwtAuthGuard)
        public deleteOffer(@Param('id', ParseIntPipe) id: number) {
            return this.offerService.deleteOffer(id);
        }        
    

}
