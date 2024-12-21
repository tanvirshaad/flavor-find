import { Module, Res } from '@nestjs/common';
import { RestaurantReviewsController } from './restaurant-reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantReview } from './restaurant-review.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/users/user.entity';
import { RestaurantReviewsService } from './Provider/restaurant-reviews.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [RestaurantReviewsController],
  imports: [
    TypeOrmModule.forFeature([RestaurantReview, User, Restaurant]),
    UsersModule,
  ],
  providers: [RestaurantReviewsService],
})
export class RestaurantReviewsModule {}
