import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ReviewsService } from './Provider/reviews.service';
import { CreateReviewDto } from './DTOs/create-review.dto';
import { UpdateReviewDto } from './DTOs/update-review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(
        private readonly reviewsService: ReviewsService
    ) {}

    @Post()
    public createReview(@Body() createReviewDto: CreateReviewDto, userId: number, foodItemId: number, restaurantId: number) {
        return this.reviewsService.createReview(createReviewDto, userId, foodItemId, restaurantId);
    }

    @Get()
    public getAllReviews() {
        return this.reviewsService.getAllReviews();
    }

    @Get('/:id')
    public getReviewById(id: number) {
        return this.reviewsService.getReviewById(id);
    }

    @Put('/:id')
    public updateReview(id: number, updateReviewDto: UpdateReviewDto) {
        return this.reviewsService.updateReview(id, updateReviewDto);
    }

    @Get('/delete/:id')
    public deleteReview(id: number) {
        return this.reviewsService.deleteReview(id);
    }
}
