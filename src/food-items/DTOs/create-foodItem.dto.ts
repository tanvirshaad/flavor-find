import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFoodItemDto {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsString()
  description: string;
  @IsString()
  cuisine: string;
  @IsString()
  @IsOptional()
  image?: string;
  @IsBoolean()
  isAvailable: boolean;
  @IsNumber()
  restaurantId: number;
}

/*
id: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
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

    @Column()
    restaurantId: number;
*/
