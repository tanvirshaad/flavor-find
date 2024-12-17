import { InjectRepository } from "@nestjs/typeorm";
import { Restaurant } from "../restaurant.entity";
import { Repository } from "typeorm";
import { CreateRestaurantDto } from "../DTOs/create-restaurant.dto";
import { User } from "src/users/user.entity";
import { UpdateRestaurantDto } from "../DTOs/update-restaurant.dto";
import { Reservation } from "src/reservations/reservation.entity";

export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private restaurantRepository: Repository<Restaurant>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
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

    public async getRestaurantReviews(id: number) {
        return this.restaurantRepository.findOne({
            where: { id },
            relations: ['reviews'], 
        });
    }

    public async changeRestaurantReservation(id: number, reservationId: number, newStatus: string) {
        
        const restaurant = await this.restaurantRepository.findOne({
            where: { id },
            relations: ['reservations'],
        });
        if (!restaurant) {
            throw new Error('Restaurant not found');
        } 
        const reservation = restaurant.reservations.find(
            (res) => res.id === reservationId
        );
        if (!reservation) {
            throw new Error('Reservation not found for this restaurant');
        }
        reservation.status = newStatus;
        return await this.reservationRepository.save(reservation);
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