import { FoodItem } from 'src/food-items/food-items.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Favourite {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => User, (user) => user.favourites)
  user: User;

  @ManyToOne(() => FoodItem, (foodItem) => foodItem.favourites)
  foodItem: FoodItem;
}
