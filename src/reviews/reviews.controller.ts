import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './Provider/reviews.service';
import { CreateReviewDto } from './DTOs/create-review.dto';
import { UpdateReviewDto } from './DTOs/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  public createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Query('userId', ParseIntPipe) userId: number,
    @Query('foodItemId', ParseIntPipe)
    foodItemId: number,
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    return this.reviewsService.createReview(
      createReviewDto,
      userId,
      foodItemId,
      restaurantId,
    );
  }
  // @Post()
  // public createReview(@Body() createReviewDto: CreateReviewDto, userId: number, foodItemId: number, restaurantId: number) {
  //     return this.reviewsService.createReview(createReviewDto, userId, foodItemId, restaurantId);
  // }

  @Get()
  public getAllReviews() {
    return this.reviewsService.getAllReviews();
  }

  @Get('/:id')
  public getReviewById(id: number) {
    return this.reviewsService.getReviewById(id);
  }

  @Put('/:id')
  public updateReview(
    @Param('id', ParseIntPipe) id: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.updateReview(id, updateReviewDto);
  }

  @Get('/delete/:id')
  public deleteReview(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.reviewsService.deleteReview(id);
  }
}
