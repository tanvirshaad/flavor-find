import { Restaurant } from 'src/restaurants/restaurant.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.reservations)
  restaurant: Restaurant;

  @CreateDateColumn()
  reservationDate: Date;

  @Column({ type: 'time' })
  reservationTime: string;

  @Column({ type: 'int' })
  partySize: number;

  @Column({ type: 'varchar', default: 'Pending' })
  status: string;

  @CreateDateColumn()
  createdDate: Date;
}
