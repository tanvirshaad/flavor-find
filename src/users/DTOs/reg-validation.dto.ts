import { IsString } from "class-validator";

export class RegValidationDTO {
    
    @IsString()
    email: string;
    @IsString()
    otp: string;

}