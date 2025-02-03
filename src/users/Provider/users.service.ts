import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../DTOs/create-user.dto';
import { UpdateUserDto } from '../DTOs/update-user.dto';
import { LoginDto } from '../DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    createUserDto.createdAt = new Date();
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }

  //get user by id
  public async getUserById(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  //get all users
  public async getAllUsers() {
    return this.usersRepository.find();
  }
  //update user based on id
  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }
  //delete user based on id
  public async deleteUser(id: number) {
    return this.usersRepository.delete({ id });
  }

  public async login(loginDto: LoginDto, response: Response) {
    const { username, password } = loginDto;
    console.log(process.env.JWT_SECRET);
    const user = await this.usersRepository.findOne({
      where: { username, password },
    });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (user.password != password) {
      throw new BadRequestException('Invalid credentials');
    }
    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('token', jwt, {
      httpOnly: true,
      secure: false,
      // sameSite: 'none',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return jwt;
  }

  public async isAuth(username: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { username, password },
    });
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  public async isLoggedIn(userId: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
        isLoggedIn: true,
      },
    });
    return !!user;
  }

  public logout(response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 0,
    });
    return { message: 'Logged out successfully' };
  }
}
