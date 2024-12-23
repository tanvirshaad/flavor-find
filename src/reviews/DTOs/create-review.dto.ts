import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  rating: number;

  @IsString()
  comment: string;

  @IsOptional()
  createdDate?: Date;
  // @IsNumber()

  // @IsNotEmpty()
  // userId: number;

  @IsNumber()
  @IsNotEmpty()
  restaurantId: number;

  @IsNumber()
  @IsNotEmpty()
  foodItemId: number;
}
