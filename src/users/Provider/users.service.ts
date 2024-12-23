import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../DTOs/create-user.dto";
import { UpdateUserDto } from "../DTOs/update-user.dto";
import e from "express";
import { LoginDto } from "../DTOs/login.dto";
import { JwtService } from "@nestjs/jwt";
//import { MailerService } from "src/mailer/Provider/mailer.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
        //private readonly mailerService: MailerService,
        private JwtService: JwtService
        
    ) {}

    public async createUser(createUserDto: CreateUserDto){
        createUserDto.createdAt = new Date();
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
        //await this.mailerService.sendRegisterYouEmail(createUserDto.email);
        return newUser;
    }

    //get user by id
    public async getUserById(id: number){
        return this.usersRepository.findOne({ where: { id } });
    }
    //get all users
    public async getAllUsers(){
        return this.usersRepository.find();
    }
    //update user based on id
    public async updateUser(id: number, updateUserDto: UpdateUserDto){
        const user = await this.usersRepository.findOneBy({ id });
        const updatedUser = this.usersRepository.merge(user, updateUserDto);
        return this.usersRepository.save(updatedUser);
    }
    //delete user based on id
    public async deleteUser(id: number){
        return this.usersRepository.delete({ id });
    }
    public async validateUser({ username, password }: LoginDto) {
        const findUser = await this.usersRepository.findOne({
          where: { username: username },
        });
    
        if (!findUser) return null;
    
        if (password === findUser.password) {
          const { password, ...user } = findUser;
          return this.JwtService.sign(user);
        }
      }

    public async login(loginDto: LoginDto){
        const { username, password } = loginDto;
        const user = await this.usersRepository.findOne({ where: { username, password } });
        if(user){
            return true;
        }
        else{
            return false;
        }
    }

    public async isAuth(username: string, password: string){
        const user = await this.usersRepository.findOne({ where: { username, password } });
        if(user){
            return true;
        }
        else{
            return false;
        }
    }
}