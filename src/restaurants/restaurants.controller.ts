import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './Provider/restaurants.service';
import { CreateRestaurantDto } from './DTOs/create-restaurant.dto';
import { UpdateUserDto } from 'src/users/DTOs/update-user.dto';
import { UpdateRestaurantDto } from './DTOs/update-restaurant.dto';
import { stat } from 'fs';
import { JwtAuthGuard } from 'src/users/Guard/jwt.guard';
import { UsersService } from 'src/users/Provider/users.service';
import { Request } from 'express';

@Controller('restaurants')
export class RestaurantsController {
    constructor(
        private readonly usersService: UsersService,
        private readonly restaurantsService: RestaurantsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    public async createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto, @Req() req: Request) {
        const userId = req.user['id'];
        createRestaurantDto.userId = userId;
        return this.restaurantsService.createRestaurant(createRestaurantDto);
    }


    @Get()
    public getAllRestaurants() {
        return this.restaurantsService.getAllRestaurants();
    }
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    public getRestaurantById(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantsService.getRestaurantById(id);
    }    
    // to view the reviews of a the specific restaurant only
    @Get('/restaurantReviews/:id')
    @UseGuards(JwtAuthGuard)
    public getRestaurantReviews(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantsService.getRestaurantReviews(id);
    }  

    @Get('/reservation/:id')
    @UseGuards(JwtAuthGuard)
    public changeRestaurantReservation(@Param('id', ParseIntPipe) id: number , @Query('reservationId', ParseIntPipe) reservationId: number, @Query('newStatus') newStatus: string) {
        return this.restaurantsService.changeRestaurantReservation(id, reservationId, newStatus);
    }  

    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    public updateRestaurant(@Param('id', ParseIntPipe) id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
    }

    @Get('/updatestatus/:id')
    @UseGuards(JwtAuthGuard)
    public updateRestaurantStatus(@Param('id', ParseIntPipe) id: number , @Query('status') status: string) {
        return this.restaurantsService.updateRestaurantStatus(id, status);
    }  

    @Get('/delete/:id')
    @UseGuards(JwtAuthGuard)
    public deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantsService.deleteRestaurant(id);
    }
}
