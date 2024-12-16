import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RestaurantsService } from './Provider/restaurants.service';
import { CreateRestaurantDto } from './DTOs/create-restaurant.dto';
import { UpdateUserDto } from 'src/users/DTOs/update-user.dto';
import { UpdateRestaurantDto } from './DTOs/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) {}

    @Post()
    public createRestaurant(@Body() createRestaurantDto: CreateRestaurantDto, @Query('userId') userId: number) {
        return this.restaurantsService.createRestaurant(createRestaurantDto, userId);
    }

    @Get()
    public getAllRestaurants() {
        return this.restaurantsService.getAllRestaurants();
    }
    @Get('/:id')
    public getRestaurantById(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantsService.getRestaurantById(id);
    }    

    @Put('/:id')
    public updateRestaurant(@Param('id', ParseIntPipe) id: number, @Body() updateRestaurantDto: UpdateRestaurantDto) {
        return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
    }

    @Get('/delete/:id')
    public deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
        return this.restaurantsService.deleteRestaurant(id);
    }
}
