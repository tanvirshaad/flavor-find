import { Favourite } from 'src/favourites/favourite.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { RestaurantRespond } from 'src/restaurant-respond/restaurant-Respond.entity';
import { RestaurantReview } from 'src/restaurant-reviews/restaurant-review.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Review } from 'src/reviews/review.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  username: string;
  @Column()
  role: string;
  @Column()
  createdAt: Date;
  @Column()
  status: string;

  @Column({ default: false })
  isLoggedIn: boolean;
  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants: Restaurant[];
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
  @OneToMany(() => RestaurantRespond, (responds) => responds.user)
  responds: RestaurantRespond[];
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
  @OneToMany(() => Favourite, (favourite) => favourite.user)
  favourites: Favourite[];
  @OneToMany(
    () => RestaurantReview,
    (restaurantReview) => restaurantReview.user,
  )
  restaurantReviews: RestaurantReview[];
}
