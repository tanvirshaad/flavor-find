import { IsOptional, IsString } from "class-validator";

export class CreateRestaurantResponseDto {
   
    @IsString()
    comment: string;
        
    @IsOptional()
    createdDate?: Date;
}
    