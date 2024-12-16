import { Module } from '@nestjs/common';
import { FoodItemsController } from './food-items.controller';
import { FoodItemsService } from './Provider/food-items.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodItem } from './food-items.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';

@Module({
  controllers: [FoodItemsController],
  imports: [TypeOrmModule.forFeature([FoodItem, Restaurant])],
  providers: [FoodItemsService],
})
export class FoodItemsModule {}
