import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { FoodItemsService } from './Provider/food-items.service';
import { CreateFoodItemDto } from './DTOs/create-foodItem.dto';
import { UpdateFoodItemDto } from './DTOs/update-foodItem.dto';

@Controller('food-items')
export class FoodItemsController {
    constructor(private readonly foodItemsService: FoodItemsService) {}

    @Get('/search')
    public searchFoodItemByName(@Query('item') item: string) {
        console.log(typeof item);
        return this.foodItemsService.searchFoodItemByName(item);
    }

    @Post()
    public createFoodItem(@Body() createFoodItemDto: CreateFoodItemDto, @Query('restaurantId', ParseIntPipe) restaurantId: number) {   
        return this.foodItemsService.createFoodItem(createFoodItemDto, restaurantId);
    }

    @Get()
    public getAllFoodItems() {
        return this.foodItemsService.getAllFoodItems();
    }

    @Get('/:id')
    public getFoodItemById(@Param('id', ParseIntPipe) id: number) {
        return this.foodItemsService.getFoodItemById(id);
    }

    @Put('/:id')
    public updateFoodItem(@Param('id', ParseIntPipe) id: number, @Body() updateFoodItemDto: UpdateFoodItemDto) {
        return this.foodItemsService.updateFoodItem(id, updateFoodItemDto);
    }

    @Get('/delete/:id')
    public deleteFoodItem(@Param('id', ParseIntPipe) id: number) {
        return this.foodItemsService.deleteFoodItem(id);
    }

    
}
