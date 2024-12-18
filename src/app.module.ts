import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurants/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { FoodItemsModule } from './food-items/food-items.module';
import { FoodItem } from './food-items/food-items.entity';
import { ReviewsModule } from './reviews/reviews.module';
import { Review } from './reviews/review.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { Reservation } from './reservations/reservation.entity';
import { OffersModule } from './offers/offers.module';
import { Offer } from './offers/offer.entity';
import { RestaurantRespondController } from './restaurant-respond/restaurant-respond.controller';
import { RestaurantRespondModule } from './restaurant-respond/restaurant-respond.module';
import { RestaurantRespond } from './restaurant-respond/restaurant-Respond.entity';
import { FavouritesModule } from './favourites/favourites.module';
import { Favourite } from './favourites/favourite.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'flavor-find',
      entities: [
        User,
        Restaurant,
        FoodItem,
        Review,
        Reservation,
        Offer,
        Favourite,
        RestaurantRespond,
      ],
      synchronize: true,
    }),
    UsersModule,
    RestaurantsModule,
    FoodItemsModule,
    ReviewsModule,
    ReservationsModule,
    OffersModule,
    FavouritesModule,
    RestaurantRespondModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//npm run start:dev
