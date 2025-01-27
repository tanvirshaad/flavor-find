import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantReviewDto {
  @IsString()
  comment: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsOptional()
  createdDate?: Date;

  @IsNumber()
  userId: number;

  @IsNumber()
  restaurantId: number;
}
