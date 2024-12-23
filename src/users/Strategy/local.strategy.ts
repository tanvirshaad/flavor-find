import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../Provider/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  validate(username: string, password: string) {
    const user = this.userService.validateUser({ username, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
