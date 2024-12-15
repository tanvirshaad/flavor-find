import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user.entity";
import { CreateUserDto } from "../DTOs/create-user.dto";
import { UpdateUserDto } from "../DTOs/update-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ) {}

    public async createUser(createUserDto: CreateUserDto){
        createUserDto.createdAt = new Date();
        let newUser = this.usersRepository.create(createUserDto);
        newUser = await this.usersRepository.save(newUser);
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
}