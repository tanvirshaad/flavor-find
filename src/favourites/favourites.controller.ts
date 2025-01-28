import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { FavouritesService } from './Provider/favourites.service';
import { CreateFavouriteDto } from './DTOs/create-favourites.dto';

@Controller('favourites')
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}

  @Post()
  public async addFavourite(
    createFavouriteDto: CreateFavouriteDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.favouritesService.createFavourite(createFavouriteDto);
    } else {
      throw new BadRequestException('You are not logged');
    }
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
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.favouritesService.updateFavouriteStatus(favouriteId, status);
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }
}
