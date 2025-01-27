import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/users/user.entity';
import { ReviewsService } from './Provider/reviews.service';
import { FoodItem } from 'src/food-items/food-items.entity';
import { UsersController } from 'src/users/users.controller';

@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([Review, Restaurant, User, FoodItem])],
})
export class ReviewsModule {}
