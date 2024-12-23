import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { RestaurantRespondService } from './Provider/restaurant-respond.service';
import { CreateRestaurantResponseDto } from './DTOs/create-restaurant-respond.dto';
import { UpdateRestaurantRespondDto } from './DTOs/update-restaurant-respond.dto';

@Controller('restaurant-respond')
export class RestaurantRespondController {
  constructor(private readonly responseService: RestaurantRespondService) {}

  @Post()
  public createResponse(
    @Body() createResponseDto: CreateRestaurantResponseDto,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('reviewId', ParseIntPipe)
    reviewId: number,
    @Body('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    return this.responseService.createResponse(
      createResponseDto,
      userId,
      reviewId,
      restaurantId,
    );
  }
  

  @Get()
  public getAllResponds() {
    return this.responseService.getAllResponds();
  }

  @Get('/:id')
  public getRespondById(id: number) {
    return this.responseService.getRespondById(id);
  }

  @Put('/:id')
  public updateResponse(
    @Param('id', ParseIntPipe) id: number,
    updateResponseDto: UpdateRestaurantRespondDto,
  ) {
    return this.responseService.updateResponse(id, updateResponseDto);
  }

  @Get('/delete/:id')
  public deleteRespond(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.responseService.deleteResponse(id);
  }
}