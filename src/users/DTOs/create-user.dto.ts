import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    username: string;
    @IsString()
    role: string;
    @IsDate()
    @IsOptional()
    createdAt?: Date;
    @IsString()
    status: string;
}