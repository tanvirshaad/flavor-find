import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './Provider/reservations.service';
import { CreateReservationDto } from './DTOs/create-reservations.dto';
import { UpdateReservationDto } from './DTOs/update-reservations.dto';
import { JwtAuthGuard } from 'src/users/Guard/jwt.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  public getAllReservations() {
    return this.reservationsService.getAllReservations();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public getReservationById(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.getReservationById(id);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  public updateReservation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.updateReservation(id, updateReservationDto);
  }

  @Get('/delete/:id')
  @UseGuards(JwtAuthGuard)
  public deleteReservation(@Param('id', ParseIntPipe) id: number) {
    return this.reservationsService.deleteReservation(id);
  }
}
