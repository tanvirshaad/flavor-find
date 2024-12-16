import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ReservationsService } from './Provider/reservations.service';
import { CreateReservationDto } from './DTOs/create-reservations.dto';
import { UpdateReservationDto } from './DTOs/update-reservations.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  public createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Query('userId', ParseIntPipe) userId: number,
    @Query('restaurantId', ParseIntPipe) restaurantId: number,
  ) {
    return this.reservationsService.createReservation(
      createReservationDto,
      userId,
      restaurantId,
    );
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
  ) {
    return this.reservationsService.updateReservation(id, updateReservationDto);
  }

  @Get('/delete/:id')
  public deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.deleteReservation(id);
  }
}
