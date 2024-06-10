import { Module } from '@nestjs/common';
import { NewsController } from './controllers/news/news.controller';
import { NewsService } from './services/news/news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/typeorm/entities/news';
import { GatewayService } from './services/gateway/gateway.service';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
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
  controllers: [NewsController],
  providers: [NewsService, GatewayService]
})
export class NewsModule {}
