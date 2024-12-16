import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt: Date;

    @Column({ type: 'time' })
    openingTime: string; // Example: "08:00:00"

    @Column({ type: 'time' })
    closingTime: string; //example: 
    

    // Foreign key for User
    @ManyToOne(() => User, (user) => user.restaurants)
    user: User;
}