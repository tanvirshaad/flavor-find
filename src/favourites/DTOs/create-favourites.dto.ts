import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFavouriteDto {
  @IsString()
  @IsOptional()
  status?: string;
}
