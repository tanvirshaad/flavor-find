import { FoodItem } from "src/food-items/food-items.entity";
import { RestaurantRespond } from "src/restaurant-respond/restaurant-Respond.entity";
import { Restaurant } from "src/restaurants/restaurant.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant)
    restaurant: Restaurant;

    @ManyToOne(() => FoodItem, (foodItem) => foodItem.reviews)
    foodItem: FoodItem;

    @Column({ type: 'int', width: 1 })
    rating: number;

    @Column({ type: 'text' })
    comment: string;

    @CreateDateColumn()
    createdDate: Date;

    @OneToOne(() => RestaurantRespond, (respond) => respond.review, { cascade: true, nullable: true })
    response: RestaurantRespond | null;
}

/*
Reviews
├── ReviewId (PK)
├── UserId (FK)
├── RestaurantId (FK)
├── FoodId (FK)
├── Rating
├── Comment
└── CreatedDate
*/