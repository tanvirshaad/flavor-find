import { Restaurant } from "src/restaurants/restaurant.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    // @Column()
    // restaurantId: number;
}