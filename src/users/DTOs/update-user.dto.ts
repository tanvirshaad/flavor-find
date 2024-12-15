import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  
}