import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/entities/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { Countrie } from 'src/typeorm/entities/countrie';
import { Address } from 'src/typeorm/entities/address';
import { JWTAuthGuardAdmin, JWTAuthGuardUser } from 'src/middleware/auth/jwt-auth.guard';


@Module({
  imports :[
    TypeOrmModule.forFeature([
      User,
      Countrie,
      Address
    ]),
    JwtModule.registerAsync({
      imports :[ConfigModule],
      useFactory :async () => ({
        secret : process.env.JWT_SECRET
        ,signOptions: { expiresIn: '1d' },
      }),
      inject : [ConfigService]
    })
  ],
  controllers: [UsersController],
  providers: [UsersService,JWTAuthGuardAdmin,JWTAuthGuardUser]
})
export class UsersModule {}
