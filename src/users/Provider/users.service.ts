import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../DTOs/create-user.dto";
import { UpdateUserDto } from "../DTOs/update-user.dto";
import e from "express";
import { LoginDto } from "../DTOs/login.dto";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/Provider/mailer.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
        private readonly mailerService: MailerService,
        private JwtService: JwtService
        
    ) {}

    public async createUser(createUserDto: CreateUserDto){
        createUserDto.createdAt = new Date();
        createUserDto.status = 'Inactive';
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
        const otp = this.mailerService.generateOtp();
        await this.mailerService.sendOtpEmail(createUserDto.email, otp);
        return newUser;
    }

    public async verifyUser(email: string, otp: string){
        const user = await this.usersRepository.findOne({ where: { email } });
        if(user.otp === otp){
            user.status = 'Active';
            return this.usersRepository.save(user);
        }
        else{
            return null;
            }
    }   

   
    public async getUserById(id: number){
        return this.usersRepository.findOne({ where: { id } });
    }
  
    public async getAllUsers(){
        return this.usersRepository.find();
    }
   
    public async updateUser(id: number, updateUserDto: UpdateUserDto){
        const user = await this.usersRepository.findOneBy({ id });
        const updatedUser = this.usersRepository.merge(user, updateUserDto);
        return this.usersRepository.save(updatedUser);
    }
    
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