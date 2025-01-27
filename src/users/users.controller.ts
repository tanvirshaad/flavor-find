import { stat } from 'fs';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { UsersService } from './Provider/users.service';
import { GetUserDto } from './DTOs/get-user.dto';
import { UpdateUserDto } from './DTOs/update-user.dto';
import { LoginDto } from './DTOs/login.dto';
import { JwtAuthGuard } from './Guard/jwt.guard';
import { LocalGuard } from './Guard/local.guard';
import { Request } from 'express';
import { RegValidationDTO } from './DTOs/reg-validation.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Post()
    public createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);    
    }



    @Get('by-id/:id')
    public getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }
    @Get()
    public getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post('/verify')
    public verifyUser(@Body() verifyUserDto: RegValidationDTO) {
        return this.usersService.verifyUser(verifyUserDto.email, verifyUserDto.otp);    
    }
    
    @Put('/:id')
    @UseGuards(JwtAuthGuard)
    public async updateUser(
     @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Get('/delete/:id')
    @UseGuards(JwtAuthGuard)
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
    // @Post('/login')
    // @UseGuards(JwtAuthGuard)
    // public login(@Body() loginDto: LoginDto) {
    //     return this.usersService.login(loginDto);
    // }
    @Post('/signin')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
    return req.user;
    }


    @Get('profile')
    @UseGuards(JwtAuthGuard)
    whoAmI(@Req() req: Request) {
        const user = req.user;  
         return this.usersService.getUserById(user['id']);
        
    }
    @Post('/isAuth')
    public isAuth(@Body() loginDto: LoginDto) {
        return this.usersService.isAuth(loginDto.username, loginDto.password);
    }
}



/*
npm i
npm install class-validator@0.14.1 class-transformer@0.5.1
npm i typeorm@0.3.20 @nestjs/typeorm@10.0.2 pg@8.11.5
*/