import { PartialType } from "@nestjs/mapped-types";
import { IsOptional } from "class-validator";
import { CreateReservationDto } from "src/reservations/DTOs/create-reservations.dto";

export class UpdateRestaurantRespondDto extends PartialType(CreateReservationDto) {
   
    @IsOptional()
    comment?: string;
}