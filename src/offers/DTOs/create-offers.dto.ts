import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOffersDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsNotEmpty()
    @IsString()
    description: string;
    @IsNotEmpty()
    @IsNumber()
    discountPercentage: number;
    @IsDate()
    @IsOptional()
    validFrom?: Date;
    @IsNotEmpty()
    @IsString()
    status: string;
    @IsNumber()
    @IsOptional()
    restaurantId?: number;
}