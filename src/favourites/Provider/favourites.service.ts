import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Favourite } from '../favourite.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { FoodItem } from 'src/food-items/food-items.entity';
import { CreateFavouriteDto } from '../DTOs/create-favourites.dto';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private readonly favouriteRepository: Repository<Favourite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FoodItem)
    private readonly foodItemRepository: Repository<FoodItem>,
  ) {}

  public async createFavourite(
    createFavouriteDto: CreateFavouriteDto,
    userId: number,
    foodItemId: number,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const foodItem = await this.foodItemRepository.findOne({
      where: { id: foodItemId },
    });
    // createFavouriteDto.createdDate = new Date();
    return await this.favouriteRepository.save({
      ...createFavouriteDto,
      craetedDate: new Date(),
      user,
      foodItem,
    });
  }

  public async getFavouritesByUserId(userId: number) {
    return await this.favouriteRepository.find({
      where: { user: { id: userId } },
    });
  }

  public async updateFavouriteStatus(favouriteId: number, status: string) {
    const favourite = await this.favouriteRepository.findOne({
      where: { id: favouriteId },
    });
    favourite.status = status;
    return await this.favouriteRepository.save(favourite);
  }
}
