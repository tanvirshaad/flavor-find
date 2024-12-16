import { Repository } from "typeorm";
import { FoodItem } from "../food-items.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateFoodItemDto } from "../DTOs/create-foodItem.dto";
import { Restaurant } from "src/restaurants/restaurant.entity";
import { UpdateFoodItemDto } from "../DTOs/update-foodItem.dto";

export class FoodItemsService {
    constructor(
        @InjectRepository(FoodItem)
        private foodItemsRepository: Repository<FoodItem>,
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
    ) {}

    public async createFoodItem(createFoodItemDto: CreateFoodItemDto, id:number){
        createFoodItemDto.restaurantId = id;
        const newFoodItem = this.foodItemsRepository.create(createFoodItemDto);

        return this.foodItemsRepository.save(newFoodItem);
    }

    public async getAllFoodItems(){
        return this.foodItemsRepository.find();
    }

    public async getFoodItemById(id: number){
        return this.foodItemsRepository.findOne({ where: { id } });
    }

    public async updateFoodItem(id: number, updateFoodItemDto: UpdateFoodItemDto){
        const foodItem = await this.getFoodItemById(id);
        const updatedFoodItem = this.foodItemsRepository.merge(foodItem, updateFoodItemDto);
        return this.foodItemsRepository.save(updatedFoodItem);
    }

    public async deleteFoodItem(id: number){
        return this.foodItemsRepository.delete({ id });
    }

}