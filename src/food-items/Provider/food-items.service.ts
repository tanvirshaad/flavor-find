import { ILike, Repository, Between } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FoodItem } from '../food-items.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFoodItemDto } from '../DTOs/create-foodItem.dto';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { UpdateFoodItemDto } from '../DTOs/update-foodItem.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FoodItemsService {
  constructor(
    @InjectRepository(FoodItem)
    private foodItemsRepository: Repository<FoodItem>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  public async searchFoodItemByName(item: string) {
    console.log(typeof item);
    if (!item || item.trim() === '') {
      return [];
    }

    console.log('Searching for item:', item);
    console.log('Search term type:', typeof item);

    return this.foodItemsRepository.find({
      where: {
        name: ILike(`%${item.trim()}%`),
      },
    });
  }
  //get food items by their cuisine
  public async getFoodItemsByCuisine(cuisine: string) {
    return this.foodItemsRepository.find({
      where: {
        cuisine: cuisine,
      },
    });
  }

  //write a function that will return the owner of the restaurant
  public async getRestaurantOwner(restaurantId: number) {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['user'],
      select: ['user'],
    });

    //return the userId of the owner of the restaurant
    return restaurant?.user?.id;
  }

  public async createFoodItem(
    createFoodItemDto: CreateFoodItemDto,
    userId: number,
  ) {
    if (
      (await this.getRestaurantOwner(createFoodItemDto.restaurantId)) === userId
    ) {
      const { restaurantId } = createFoodItemDto;
      const restaurant = await this.restaurantRepository.findOne({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException(
          `Restaurant with ID ${restaurantId} not found`,
        );
      }

      const newFoodItem = this.foodItemsRepository.create({
        ...createFoodItemDto,
        restaurant,
      });
      return this.foodItemsRepository.save(newFoodItem);
    }
  }

  public async getAllFoodItems() {
    return this.foodItemsRepository.find();
  }

  public async getFoodItemById(id: number) {
    return this.foodItemsRepository.findOne({ where: { id } });
  }

  public async updateFoodItem(
    id: number,
    updateFoodItemDto: UpdateFoodItemDto,
  ) {
    const foodItem = await this.getFoodItemById(id);
    const updatedFoodItem = this.foodItemsRepository.merge(
      foodItem,
      updateFoodItemDto,
    );
    return this.foodItemsRepository.save(updatedFoodItem);
  }

  public async deleteFoodItem(id: number) {
    return this.foodItemsRepository.delete({ id });
  }

  //filter by price range
  public async filterByPriceRange(minPrice: number, maxPrice: number) {
    console.log(minPrice, maxPrice);
    return this.foodItemsRepository.find({
      where: {
        price: Between(minPrice, maxPrice),
      },
    });
  }

  public async getFoodItemsByRestaurantId(restaurantId: number) {
    return this.foodItemsRepository.find({
      where: {
        restaurantId,
      },
    });
  }
}
