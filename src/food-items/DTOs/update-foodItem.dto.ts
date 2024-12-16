import { PartialType } from "@nestjs/mapped-types";
import { CreateFoodItemDto } from "./create-foodItem.dto";

export class UpdateFoodItemDto extends PartialType(CreateFoodItemDto) {
    
}