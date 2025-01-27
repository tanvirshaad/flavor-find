import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Req } from '@nestjs/common';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantResponseDto } from '../DTOs/create-restaurant-respond.dto';
import { RestaurantRespond } from '../restaurant-Respond.entity';
import { UpdateRestaurantRespondDto } from '../DTOs/update-restaurant-respond.dto';

@Injectable()
export class RestaurantRespondService {
  constructor(
    @InjectRepository(RestaurantRespond)
    private restaurantRespondRepository: Repository<RestaurantRespond>,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  public async createResponse(createRespondDto: CreateRestaurantResponseDto) {
    const { userId, reviewId, restaurantId } = createRespondDto;
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const review = await this.reviewRepository.findOne({
      where: { id: reviewId },
    });
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: restaurantId },
    });
    createRespondDto.createdDate = new Date();

    const newRespond = this.restaurantRespondRepository.create({
      ...createRespondDto,
      user,
      review,
      restaurant,
    });
    return this.restaurantRespondRepository.save(newRespond);
  }

  public async getAllResponds() {
    return this.restaurantRespondRepository.find();
  }

  public async getRespondById(id: number) {
    return this.restaurantRespondRepository.findOne({ where: { id } });
  }

  public async updateResponse(
    responseId: number,
    updateResponseDto: UpdateRestaurantRespondDto,
  ) {
    const response = await this.restaurantRespondRepository.findOne({
      where: { id: responseId },
    });
    if (!response) {
      return null;
    }
    console.log(updateResponseDto);
    const updatedResponse = this.restaurantRespondRepository.merge(
      response,
      updateResponseDto,
    );
    return this.restaurantRespondRepository.save(updatedResponse);
  }

  public async deleteResponse(id: number) {
    return this.restaurantRespondRepository.delete({ id });
  }
}
