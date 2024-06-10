import { ForbiddenException, Injectable, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
import {  Repository } from "typeorm";
import { User } from "src/typeorm/entities/user";

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(
    @InjectRepository(User) 
    private userRepository : Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number , isAdmin :  boolean}) {
    const user = await this.userRepository.findOne({where : {id : payload.userId}});

    if (!user) {
      throw new UnauthorizedException('Access denied');
    }
    return { user };
  }
}


@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @InjectRepository(User) 
    private userRepository : Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }
  async validate(payload: { userId: number , isAdmin :  boolean}) {
    if (payload.isAdmin == false ) {
      throw new UnauthorizedException('Access denied');
    }
    const user = await this.userRepository.findOne({where : {id : payload.userId}});

    if (!user) {
      throw new UnauthorizedException('Access denied');
    }
    return { user };
  }

}






