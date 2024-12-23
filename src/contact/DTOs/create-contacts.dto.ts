import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/users/user.entity";
import { OneToMany } from "typeorm";
import { ManyToOne } from "typeorm";

export default class CreateContactsDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;
    @IsNotEmpty()
    @IsString()
    lastname: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    message: string;
    @IsNotEmpty()
    @IsString()
    status: string;
    @IsNumber()
    @IsOptional()
    userId?: number;
    @ManyToOne(() => User, user => user.contacts)
    user: User;

}
// export class UpdateContactsDto {
//     @IsOptional()
//     @IsString()
//     firstname?: string;
//     @IsOptional()
//     @IsString()
//     lastname?: string;
//     @IsOptional()
//     @IsString()
//     email?: string;
//     @IsOptional()
//     @IsString()
//     massage?: string;
//     @IsOptional()
//     @IsString()
//     status?: string;
//     @IsOptional()
//     @IsNumber()
//     userId?: number;
//     @IsOptional()
//     @IsDate()
//     validFrom?: Date;
// }