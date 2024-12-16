import { Restaurant } from "src/restaurants/restaurant.entity";
import { Review } from "src/reviews/review.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    cuisine: string;

    @Column()
    isAvailable: boolean;

    @ManyToOne(() => Restaurant, (restaurant) => restaurant.foodItems, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'restaurantId' })
    restaurant: Restaurant;

    @OneToMany(() => Review, (review) => review.foodItem)
    reviews: Review[];

    // @Column()
    // restaurantId: number;
}