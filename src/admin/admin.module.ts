import { Module } from '@nestjs/common';
import { AdminsService } from './services/admins/admins.service';
import { AdminsController } from './controllers/admins/admins.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { Address } from 'src/typeorm/entities/address';
import { UserAddress } from 'src/typeorm/entities/user-address';
import { AdminJwtStrategy } from 'src/middleware/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { JWTAuthGuardAdmin } from 'src/middleware/auth/jwt-auth.guard';
import { WsAdapter } from '@nestjs/platform-ws';



@Module({
  imports : [
    TypeOrmModule.forFeature([
      User,
      Address,
      UserAddress
    ]),
    WsAdapter,
    PassportModule,
    JwtModule.registerAsync({
      imports :[ConfigModule],
      useFactory :async () => ({
        secret : process.env.JWT_SECRET
        ,signOptions: { expiresIn: '1d' },
      }),
      inject : [ConfigService]
    })
  ],
  providers: [AdminsService,JWTAuthGuardAdmin],
  controllers: [AdminsController]
})
export class AdminModule {}
