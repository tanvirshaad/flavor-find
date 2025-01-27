import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRestaurantResponseDto {
  @IsString()
  comment: string;

  @IsOptional()
  createdDate?: Date;

  @IsNumber()
  restaurantId: number;

  @IsNumber()
  userId: number;

  @IsNumber()
  reviewId: number;
}
