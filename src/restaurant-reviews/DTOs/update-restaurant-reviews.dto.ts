import { IsOptional } from 'class-validator';

export class UpdateRestaurantReviewsDto {
  @IsOptional()
  comment?: string;

  @IsOptional()
  rating?: number;
}
