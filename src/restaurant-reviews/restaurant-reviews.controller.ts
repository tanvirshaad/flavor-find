import {
  Controller,
  Post,
  Query,
  ParseIntPipe,
  Body,
  Get,
  Put,
  Param,
} from '@nestjs/common';
import { RestaurantReviewsService } from './Provider/restaurant-reviews.service';
import { CreateRestaurantReviewDto } from './DTOs/create-restaurant-review.dto';
import { UpdateRestaurantReviewsDto } from './DTOs/update-restaurant-reviews.dto';
import { log } from 'console';

@Controller('restaurant-reviews')
export class RestaurantReviewsController {
  constructor(private restaurantReviewsService: RestaurantReviewsService) {}

  @Post()
  public createRestaurantReview(
    @Body()
    createRestaurantReviewDto: CreateRestaurantReviewDto,
    @Query('userId', ParseIntPipe) userId: number,
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    // console.log(createRestaurantReviewDto);
    return this.restaurantReviewsService.createRestaurantReview(
      createRestaurantReviewDto,
      userId,
      restaurantId,
    );
  }
  //get by restaurant id
  @Get()
  public getRestaurantReviews(
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    return this.restaurantReviewsService.getRestaurantReviews(restaurantId);
  }
  @Get()
  public getAllRestaurantReviews() {
    return this.restaurantReviewsService.getAllRestaurantReviews();
  }
  //get by review id
  @Get(':id')
  public getRestaurantReview(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantReviewsService.getRestaurantReview(id);
  }

  @Put(':id')
  public updateRestaurantReview(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRestaurantReviewsDto: UpdateRestaurantReviewsDto,
  ) {
    log(updateRestaurantReviewsDto);
    return this.restaurantReviewsService.updateRestaurantReview(
      id,
      updateRestaurantReviewsDto,
    );
  }

  @Get()
  public deleteRestaurantReview(
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.restaurantReviewsService.deleteRestaurantReview(reviewId);
  }
}
