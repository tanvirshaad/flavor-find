import {
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsDateString()
  reservationDate?: string;

  @IsOptional()
  reservationTime?: string;

  @IsOptional()
  @IsInt()
  partySize?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
