import {
  Body,
  Controller,
  Get,
  Param,
  BadRequestException,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { FoodItemsService } from './Provider/food-items.service';
import { CreateFoodItemDto } from './DTOs/create-foodItem.dto';
import { UpdateFoodItemDto } from './DTOs/update-foodItem.dto';

@Controller('food-items')
export class FoodItemsController {
  constructor(
    private readonly foodItemsService: FoodItemsService,
    private jwtService: JwtService,
  ) {}

  @Get()
  public async getFoodItemsByRestaurant(
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    // console.log(restaurantId);
    return this.foodItemsService.getFoodItemsByRestaurantId(restaurantId);
  }
  //get by cuisine
  @Get('/cusine')
  public async getFoodItemsByCuisine(@Query('cuisine') cuisine: string) {
    return this.foodItemsService.getFoodItemsByCuisine(cuisine);
  }
  @Get('/search')
  public searchFoodItemByName(@Query('item') item: string) {
    return this.foodItemsService.searchFoodItemByName(item);
  }

  @Post()
  public createFoodItem(
    @Body() createFoodItemDto: CreateFoodItemDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      const payload = this.jwtService.verify(token);
      return this.foodItemsService.createFoodItem(
        createFoodItemDto,
        payload.id,
      );
    } else {
      new BadRequestException('You are not logged in');
    }
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
  public updateFoodItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFoodItemDto: UpdateFoodItemDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.foodItemsService.updateFoodItem(id, updateFoodItemDto);
    }
  }

  @Get('/delete/:id')
  public deleteFoodItem(@Param('id', ParseIntPipe) id: number) {
    return this.foodItemsService.deleteFoodItem(id);
  }

  //filter
  @Post('/filter')
  public filterFoodItems(
    @Body('minPrice') minPrice: number,
    @Body('maxPrice') maxPrice: number,
  ) {
    console.log(minPrice, maxPrice);
    return this.foodItemsService.filterByPriceRange(minPrice, maxPrice);
  }
}
