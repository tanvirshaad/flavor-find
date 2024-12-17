import { Module, Res } from '@nestjs/common';
import { OffersController } from './offers.controller';
// import { Offer } from './offer.entity';
import { OffersService } from './Provider/offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';

@Module({
  controllers: [OffersController],
  providers: [OffersService],
  imports: [TypeOrmModule.forFeature([Offer, Restaurant])],
})
export class OffersModule {}
