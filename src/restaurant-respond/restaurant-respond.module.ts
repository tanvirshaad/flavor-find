import { Module } from '@nestjs/common';
import { RestaurantRespondController } from './restaurant-respond.controller';
import { RestaurantRespondService } from './Provider/restaurant-respond.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantRespond } from './restaurant-Respond.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/users/user.entity';
import { Review } from 'src/reviews/review.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
          RestaurantRespond,
          Review,
          User,
          Restaurant
        ])
      ],
      controllers: [RestaurantRespondController],
      providers: [RestaurantRespondService],
      exports: [RestaurantRespondService]
})
export class RestaurantRespondModule {}
