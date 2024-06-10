import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserJwtStrategy, AdminJwtStrategy } from './jwt.strategy';
import { User } from 'src/typeorm/entities/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  controllers: [],
  providers: [AdminJwtStrategy,UserJwtStrategy]
})
export class AuthModule {}
