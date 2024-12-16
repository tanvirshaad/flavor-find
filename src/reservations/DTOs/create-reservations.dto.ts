import { IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateReservationDto {
    @IsOptional()
    @IsInt()
    userId?: number;

    @IsOptional()
    @IsInt()
    restaurantId?: number;

    @IsOptional()
    @IsDate()
    reservationDate?: Date;

    @IsNotEmpty()
    @IsString()
    reservationTime: string;

    @IsNotEmpty()
    @IsInt()
    partySize: number;

    @IsOptional()
    @IsString()
    status?: string;
}