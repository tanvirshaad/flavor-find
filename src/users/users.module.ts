import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './Provider/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Review } from 'src/reviews/review.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './Strategy/local.strategy';
import { JwtStrategy } from './Strategy/jwt.strategy';
import { Contact } from 'src/contact/contact.entity';
import { MailerService } from 'src/mailer/provider/mailer.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService , LocalStrategy, JwtStrategy, MailerService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User, Restaurant, Review, Reservation, Contact]), PassportModule, JwtModule.register({
    secret: 'abc123',
    signOptions: { expiresIn: '1h' },
  })],
})
export class UsersModule {}
