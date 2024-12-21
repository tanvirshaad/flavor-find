import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../reservation.entity';
import { CreateReservationDto } from '../DTOs/create-reservations.dto';
import { User } from 'src/users/user.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { UpdateReservationDto } from '../DTOs/update-reservations.dto';

export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  public async createReservation(
    createReservationDto: CreateReservationDto,
    userId: number,
    restaurantId: number,
  ) {
    const isLoggedIn = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!isLoggedIn) {
      return 'You are not logged in';
    }
    createReservationDto.reservationDate = new Date();
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id: restaurantId },
    });
    const newReservation = this.reservationRepository.create({
      ...createReservationDto,
      user,
      restaurant,
    });
    return this.reservationRepository.save(newReservation);
  }

  public async getAllReservations() {
    return this.reservationRepository.find();
  }

  public async getReservationById(id: number) {
    return this.reservationRepository.findOne({ where: { id } });
  }

  public async updateReservation(
    reservationId: number,
    updateReservationDto: UpdateReservationDto,
  ) {
    const reservation = await this.getReservationById(reservationId);
    const updatedReservation = await this.reservationRepository.merge(
      reservation,
      updateReservationDto,
    );
    return this.reservationRepository.save(updatedReservation);
  }

  public async deleteReservation(id: number) {
    return this.reservationRepository.delete({ id });
  }
}
