import { FoodItem } from 'src/food-items/food-items.entity';
import { Offer } from 'src/offers/offer.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { RestaurantRespond } from 'src/restaurant-respond/restaurant-Respond.entity';
import { RestaurantReview } from 'src/restaurant-reviews/restaurant-review.entity';
import { Review } from 'src/reviews/review.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  cuisine: string;

  @Column({ type: 'boolean', default: true })
  isApproved: boolean;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'time' })
  openingTime: string; // "08:00:00"

  @Column({ type: 'time' })
  closingTime: string;

  // Foreign key for User
  @ManyToOne(() => User, (user) => user.restaurants)
  user: User;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.restaurant)
  foodItems: FoodItem[];

  @OneToMany(() => Review, (review) => review.restaurant)
  reviews: Review[];

  @OneToMany(() => RestaurantRespond, (responod) => responod.restaurant)
  responds: RestaurantRespond[];

  @OneToMany(() => Reservation, (reservation) => reservation.restaurant)
  reservations: Reservation[];

  @OneToMany(() => Offer, (offer) => offer.restaurant)
  offers: Offer[];

  @OneToMany(
    () => RestaurantReview,
    (restaurantReview) => restaurantReview.restaurant,
  )
  restaurantReviews: RestaurantReview[];
}
