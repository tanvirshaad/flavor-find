import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ReviewsService } from './Provider/reviews.service';
import { CreateReviewDto } from './DTOs/create-review.dto';
import { UpdateReviewDto } from './DTOs/update-review.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  public createReview(
    @Body() createReviewDto: CreateReviewDto,
    @Req() req: Request,
    // @Query('userId', ParseIntPipe) userId: number,
    // @Query('foodItemId', ParseIntPipe)
    // foodItemId: number,
    // @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    const token = req.cookies.token;
    if (token) {
      const payload = this.jwtService.verify(token);
      const userId = payload.id;
      return this.reviewsService.createReview(createReviewDto, userId);
    } else {
      throw new BadRequestException('You are not logged in');
    }
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
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.reviewsService.updateReview(id, updateReviewDto);
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }

  @Get('/delete/:id')
  public deleteReview(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.reviewsService.deleteReview(id);
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }
}
