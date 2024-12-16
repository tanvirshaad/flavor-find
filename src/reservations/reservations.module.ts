import { Module, Res } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservation.entity';
import { Type } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './Provider/reservations.service';

@Module({
  controllers: [ReservationsController],
  providers: [ReservationsService],
  imports: [TypeOrmModule.forFeature([Reservation, User, Restaurant])],

})
export class ReservationsModule {}
