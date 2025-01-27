import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { Res } from '@nestjs/common';

import { CreateUserDto } from './DTOs/create-user.dto';
import { UsersService } from './Provider/users.service';
// import { GetUserDto } from './DTOs/get-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';
import { LoginDto } from './DTOs/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    return this.usersService.logout(response);
  }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('/:id')
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }
  @Get()
  public getAllUsers() {
    return this.usersService.getAllUsers();
  }
  @Put('/:id')
  public async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Get('/delete/:id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
  @Post('/login')
  public login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.usersService.login(loginDto, response);
  }
  @Post('/isAuth')
  public isAuth(@Body() loginDto: LoginDto) {
    return this.usersService.isAuth(loginDto.username, loginDto.password);
  }

  @Get('isLoggedIn/:userId')
  public async isLoggedIn(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.isLoggedIn(userId);
  }
}

/*
npm i
npm install class-validator@0.14.1 class-transformer@0.5.1
npm i typeorm@0.3.20 @nestjs/typeorm@10.0.2 pg@8.11.5
*/
