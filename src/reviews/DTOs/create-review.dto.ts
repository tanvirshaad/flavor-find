import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    reviewId: number;
        @IsNumber()
        rating: number;
    
        @IsString()
        comment: string;
    
        @IsOptional()
        createdDate?: Date;
}