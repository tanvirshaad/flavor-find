import {
  Controller,
  Post,
  Query,
  ParseIntPipe,
  Body,
  Get,
  Put,
  Param,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RestaurantReviewsService } from './Provider/restaurant-reviews.service';
import { CreateRestaurantReviewDto } from './DTOs/create-restaurant-review.dto';
import { UpdateRestaurantReviewsDto } from './DTOs/update-restaurant-reviews.dto';
import { log } from 'console';

@Controller('restaurant-reviews')
export class RestaurantReviewsController {
  constructor(
    private restaurantReviewsService: RestaurantReviewsService,
    private jwtService: JwtService,
  ) {}

  @Post()
  public async createRestaurantReview(
    @Body()
    createRestaurantReviewDto: CreateRestaurantReviewDto,
    @Req() req: Request,
  ) {
    // console.log(createRestaurantReviewDto);
    const token = req.cookies.token;
    if (token) {
      const payload = await this.jwtService.verifyAsync(token);

      if (createRestaurantReviewDto.userId != payload.id) {
        new BadRequestException(
          'You are not authorized to respond to this review',
        );
      } else {
        return this.restaurantReviewsService.createRestaurantReview(
          createRestaurantReviewDto,
        );
      }
    }
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
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.restaurantReviewsService.updateRestaurantReview(
        id,
        updateRestaurantReviewsDto,
      );
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }

  @Get()
  public deleteRestaurantReview(
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return this.restaurantReviewsService.deleteRestaurantReview(reviewId);
  }
}
