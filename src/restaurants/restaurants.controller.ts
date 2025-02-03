import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Put,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RestaurantsService } from './Provider/restaurants.service';
import { CreateRestaurantDto } from './DTOs/create-restaurant.dto';
// import { UpdateUserDto } from 'src/users/DTOs/update-user.dto';
import { UpdateRestaurantDto } from './DTOs/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  public async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      const payload = await this.jwtService.verifyAsync(token);
      if (!payload) {
        new BadRequestException('Invalid token');
      } else {
        createRestaurantDto.userId = payload.id;
        return this.restaurantsService.createRestaurant(createRestaurantDto);
      }
    } else {
      new BadRequestException('You are not logged in');
    }
  }

  @Get()
  public getAllRestaurants() {
    return this.restaurantsService.getAllRestaurants();
  }
  @Get('/:id')
  public getRestaurantById(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.getRestaurantById(id);
  }
  // to view the reviews of a the specific restaurant only
  @Get('/restaurantReviews/:id')
  public getRestaurantReviews(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.getRestaurantReviews(id);
  }

  @Get('/reservation/:id')
  public changeRestaurantReservation(
    @Param('id', ParseIntPipe) id: number,
    @Query('reservationId', ParseIntPipe) reservationId: number,
    @Query('newStatus') newStatus: string,
  ) {
    return this.restaurantsService.changeRestaurantReservation(
      id,
      reservationId,
      newStatus,
    );
  }

  @Put('/:id')
  public updateRestaurant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.restaurantsService.updateRestaurant(id, updateRestaurantDto);
    } else {
      new BadRequestException('You are not logged in');
    }
  }

  @Get('/delete/:id')
  public deleteRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantsService.deleteRestaurant(id);
  }
}
