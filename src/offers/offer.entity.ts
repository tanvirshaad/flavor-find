import { Restaurant } from "src/restaurants/restaurant.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    discountPercentage: number;
    @CreateDateColumn()
    validFrom: Date;
    @Column()
    status: string;
    @ManyToOne(() => Restaurant, (restaurant) => restaurant.offers)
    restaurant: Restaurant;
}