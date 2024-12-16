import { PartialType } from "@nestjs/mapped-types";
import { CreateRestaurantDto } from "./create-restaurant.dto";
import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateRestaurantDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    cuisine?: string;

    @IsOptional()
    @IsBoolean()
    isApproved?: boolean;

    @IsOptional()
    @IsString()
    openingTime?: string;

    @IsOptional()
    @IsString()
    closingTime?: string;
}