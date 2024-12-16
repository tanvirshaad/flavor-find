import { Module } from '@nestjs/common';
import { RestaurantsController } from './restaurants.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './Provider/restaurants.service';

@Module({
  controllers: [RestaurantsController],
  imports: [TypeOrmModule.forFeature([Restaurant, User])],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
