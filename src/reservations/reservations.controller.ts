import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Req } from '@nestjs/common';

import { ReservationsService } from './Provider/reservations.service';
import { CreateReservationDto } from './DTOs/create-reservations.dto';
import { UpdateReservationDto } from './DTOs/update-reservations.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  public async createReservation(
    @Body() createReservationDto: CreateReservationDto,
    // @Body('restaurantId', ParseIntPipe) restaurantId: number,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      const payload = await this.jwtService.verifyAsync(token);
      console.log(payload);
      const userId = payload.id;
      return this.reservationsService.createReservation(
        createReservationDto,
        userId,
        // restaurantId,
      );
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }

  @Get()
  public getAllReservations() {
    return this.reservationsService.getAllReservations();
  }

  @Get('/:id')
  public getReservationById(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.getReservationById(id);
  }

  @Put('/:id')
  public updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
    @Req() req: Request,
  ) {
    const token = req.cookies.token;
    if (token) {
      return this.reservationsService.updateReservation(
        id,
        updateReservationDto,
      );
    } else {
      throw new BadRequestException('You are not logged in');
    }
  }

  @Get('/delete/:id')
  public deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.deleteReservation(id);
  }
}
