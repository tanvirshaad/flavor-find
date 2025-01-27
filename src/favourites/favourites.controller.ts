import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { FavouritesService } from './Provider/favourites.service';
import { CreateFavouriteDto } from './DTOs/create-favourites.dto';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  public async addFavourite(createFavouriteDto: CreateFavouriteDto) {
    return this.favouritesService.createFavourite(createFavouriteDto);
  }

  @Get('/:userId')
  public async getFavouritesByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.favouritesService.getFavouritesByUserId(userId);
  }
  @Post('/update-status')
  public async updateFavouriteStatus(
    @Query('favouriteId', ParseIntPipe) favouriteId: number,
    @Body('status') status: string,
  ) {
    return this.favouritesService.updateFavouriteStatus(favouriteId, status);
  }
}
