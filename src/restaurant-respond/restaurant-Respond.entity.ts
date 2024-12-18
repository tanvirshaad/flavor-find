import { Restaurant } from "src/restaurants/restaurant.entity";
import { Review } from "src/reviews/review.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RestaurantRespond {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    comment: string;

    @ManyToOne(() => User, (user) => user.responds)
    user: User;
   
    @ManyToOne(() => Restaurant, (restaurant) => restaurant.responds)
    restaurant: Restaurant;
    
    @OneToOne(() => Review, (review) => review.response, { onDelete: 'CASCADE' })
    @JoinColumn() 
    review: Review;

    @CreateDateColumn()
    createdDate: Date;
}
