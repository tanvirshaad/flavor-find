import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetUserDto {
    @IsNumber()
    @Type(() => Number)
    id: number;
}