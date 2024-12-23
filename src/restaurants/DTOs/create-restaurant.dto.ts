import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateRestaurantDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()    
    address: string;
    @IsNotEmpty()
    @IsString()    
    phone: string;
    @IsNotEmpty()
    @IsString()   
    cuisine: string;
    @IsNotEmpty()
    @IsBoolean()    
    isApproved: boolean;
    @IsNotEmpty()
    @IsDate() 
    @IsOptional()  
    createdAt?: Date;
    @IsNotEmpty()
    @IsString()    
    openingTime: string; // Example: "08:00:00"
    @IsNotEmpty()
    @IsString()   
    closingTime: string;
    @IsNumber()
    @IsOptional()
    userId: number;
}