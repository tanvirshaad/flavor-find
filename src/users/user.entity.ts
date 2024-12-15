import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}