import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RestaurantRespondService } from './Provider/restaurant-respond.service';
import { CreateRestaurantResponseDto } from './DTOs/create-restaurant-respond.dto';
import { UpdateRestaurantRespondDto } from './DTOs/update-restaurant-respond.dto';

@Controller('restaurant-respond')
export class RestaurantRespondController {
  constructor(
    private readonly responseService: RestaurantRespondService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  public async createResponse(
    @Body() createResponseDto: CreateRestaurantResponseDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (!token) {
      return 'You are not logged in';
    } else {
      const payload = await this.jwtService.verifyAsync(token);
      const userId = payload.id;
      if (createResponseDto.userId != userId) {
        new BadRequestException(
          'You are not authorized to respond to this review',
        );
      } else {
        return this.responseService.createResponse(createResponseDto);
      }
    }
  }

  @Get()
  public getAllResponds() {
    return this.responseService.getAllResponds();
  }

  @Get('/:id')
  public getRespondById(id: number) {
    return this.responseService.getRespondById(id);
  }

  @Put('/:id')
  public updateResponse(
    @Param('id', ParseIntPipe) id: number,
    updateResponseDto: UpdateRestaurantRespondDto,
  ) {
    return this.responseService.updateResponse(id, updateResponseDto);
  }

  @Get('/delete/:id')
  public deleteRespond(@Param('id', ParseIntPipe) id: number) {
    return this.responseService.deleteResponse(id);
  }
}
