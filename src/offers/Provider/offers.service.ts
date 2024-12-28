import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Offer } from '../offer.entity';
import { CreateOffersDto } from '../DTOs/create-offers.dto';
import { Restaurant } from 'src/restaurants/restaurant.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  public async createOffer(
    createOffersDto: CreateOffersDto,
    restaurantId: number,
  ) {
    createOffersDto.validFrom = new Date();
    const restaurant = await this.restaurantRepository.findOne({
      where: { id: restaurantId },
    });
    let newOffer = this.offersRepository.create({
      ...createOffersDto,
      restaurant,
    });
    newOffer = await this.offersRepository.save(newOffer);
    return newOffer;
  }

  public async getOffers() {
    return this.offersRepository.find();
  }

  public async getOfferById(id: number) {
    return this.offersRepository.findOne({ where: { id } });
  }

  public async deleteOffer(id: number) {
    return this.offersRepository.delete({ id });
  }
}
