import { PartialType } from "@nestjs/mapped-types";
import { CreateReviewDto } from "./create-review.dto";
import { IsOptional } from "class-validator";

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
    @IsOptional()
    rating?: number;

    @IsOptional()
    comment?: string;
}