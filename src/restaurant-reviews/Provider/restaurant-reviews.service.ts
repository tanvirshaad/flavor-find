import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantReview } from '../restaurant-review.entity';
import { User } from 'src/users/user.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { CreateRestaurantReviewDto } from '../DTOs/create-restaurant-review.dto';
import { UsersService } from 'src/users/Provider/users.service';
import { UpdateRestaurantReviewsDto } from '../DTOs/update-restaurant-reviews.dto';

@Injectable()
export class RestaurantReviewsService {
  constructor(
    @InjectRepository(RestaurantReview)
    private restauranReviewsRepository: Repository<RestaurantReview>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  public async createRestaurantReview(
    createRestaurantReviewDto: CreateRestaurantReviewDto,
    userId: number,
    restaurantId: number,
  ) {
    // console.log(createRestaurantReviewDto);
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });
    const isLoggedIn = await this.usersService.isLoggedIn(userId);
    if (!isLoggedIn) {
      return 'You are not logged in';
    } else {
      let newRestaurantReview = this.restauranReviewsRepository.create({
        ...createRestaurantReviewDto,
        createdDate: new Date(),
        user: user,
        restaurant: restaurant,
      });
      newRestaurantReview =
        await this.restauranReviewsRepository.save(newRestaurantReview);
      return newRestaurantReview;
    }
  }

  public async getRestaurantReviews(restaurantId: number) {
    return await this.restauranReviewsRepository.find({
      where: { restaurant: { id: restaurantId } },
    });
  }

  public async getAllRestaurantReviews() {
    return await this.restauranReviewsRepository.find();
  }

  public async getRestaurantReview(reviewId: number) {
    return await this.restauranReviewsRepository.findOne({
      where: { id: reviewId },
    });
  }

  public async updateRestaurantReview(
    reviewId: number,
    updateRestaurantReviewDto: UpdateRestaurantReviewsDto,
  ) {
    const review = await this.getRestaurantReview(reviewId);
    console.log(review);
    const updatedReview = this.restauranReviewsRepository.merge(
      review,
      updateRestaurantReviewDto,
    );
    return this.restauranReviewsRepository.save(updatedReview);
  }

  public async deleteRestaurantReview(reviewId: number) {
    return await this.restauranReviewsRepository.delete({ id: reviewId });
  }
}

/*
public async updateReview(reviewId: number, updateReviewDto: UpdateReviewDto){
        const review = await this.reviewRepository.findOne({ 
        where: { id: reviewId }
    });
    if(!review){
        return null;
    }
    console.log(updateReviewDto);
        const updatedReview = this.reviewRepository.merge(review, updateReviewDto);
        return this.reviewRepository.save(updatedReview);
    }
*/
