import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { Type } from 'class-transformer';
import { Favourite } from './favourite.entity';
import { User } from 'src/users/user.entity';
import { FoodItem } from 'src/food-items/food-items.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouritesService } from './Provider/favourites.service';

@Module({
  controllers: [FavouritesController],
  imports: [TypeOrmModule.forFeature([Favourite, User, FoodItem])],
  providers: [FavouritesService],
})
export class FavouritesModule {}
