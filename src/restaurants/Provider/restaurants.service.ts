import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "../restaurant.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "../DTOs/create-restaurant.dto";
import { User } from "src/users/user.entity";
import { UpdateRestaurantDto } from "../DTOs/update-restaurant.dto";

export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async createRestaurant(createRestaurantDto: CreateRestaurantDto, userId: number){
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        createRestaurantDto.createdAt = new Date();
        createRestaurantDto.userId = user.id;
        let newRestaurant = this.restaurantRepository.create(createRestaurantDto);
        newRestaurant = await this.restaurantRepository.save(newRestaurant);
        return newRestaurant;
    }

    public async getAllRestaurants(){
        return this.restaurantRepository.find();
    }

    public async getRestaurantById(id: number){
        return this.restaurantRepository.findOne({ where: { id } });
    }

    public async updateRestaurant(id: number, updateRestaurantDto: UpdateRestaurantDto){
        const restaurant = await this.getRestaurantById(id);
        const updatedRestaurant = this.restaurantRepository.merge(restaurant, updateRestaurantDto);
        return this.restaurantRepository.save(updatedRestaurant);
        
    }
    public async deleteRestaurant(id: number){
        return this.restaurantRepository.delete({ id });
    }

}