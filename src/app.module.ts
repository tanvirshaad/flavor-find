import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './restaurants/restaurant.entity';
import { RestaurantsModule } from './restaurants/restaurants.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'flavor-find',
      entities: [User, Restaurant],
      synchronize: true,
    }
  ),
    UsersModule,
    RestaurantsModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

//npm run start:dev