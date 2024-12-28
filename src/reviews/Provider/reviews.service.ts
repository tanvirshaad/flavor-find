import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../review.entity';
import { CreateReviewDto } from '../DTOs/create-review.dto';
import { User } from 'src/users/user.entity';
import { FoodItem } from 'src/food-items/food-items.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { UpdateReviewDto } from '../DTOs/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(FoodItem)
    private foodItemsRepository: Repository<FoodItem>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  public async createReview(createReviewDto: CreateReviewDto, userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    const foodItem = await this.foodItemsRepository.findOne({
      where: { id: createReviewDto.foodItemId },
    });
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: createReviewDto.restaurantId },
    });
    createReviewDto.createdDate = new Date();

    const newReview = this.reviewRepository.create({
      ...createReviewDto,
      user,
      foodItem,
      restaurant,
    });
    return this.reviewRepository.save(newReview);
  }

  public async getAllReviews() {
    return this.reviewRepository.find();
  }

  public async getReviewById(id: number) {
    return this.reviewRepository.findOne({ where: { id } });
  }

  public async updateReview(
    reviewId: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    if (!review) {
      return null;
    }
    console.log(updateReviewDto);
    const updatedReview = this.reviewRepository.merge(review, updateReviewDto);
    return this.reviewRepository.save(updatedReview);
  }

  public async deleteReview(id: number) {
    return this.reviewRepository.delete({ id });
  }
}
