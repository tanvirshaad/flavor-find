import { Favourite } from 'src/favourites/favourite.entity';
import { Restaurant } from 'src/restaurants/restaurant.entity';
import { Review } from 'src/reviews/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  image: string;

  @Column()
  cuisine: string;

  @Column()
  isAvailable: boolean;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurantId' })
  restaurant: Restaurant;

  @OneToMany(() => Review, (review) => review.foodItem)
  reviews: Review[];
  @OneToMany(() => Favourite, (favourite) => favourite.foodItem)
  favourites: Favourite[];

  // @Column()
  // restaurantId: number;
}
