import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './typeorm/entities/address';
import { Countrie } from './typeorm/entities/countrie';
import { UserAddress } from './typeorm/entities/user-address';
import { User } from './typeorm/entities/user';
import { QueryService } from './middleware/sql/query/query.service';
import { AuthModule } from './middleware/auth/auth.module';
import { News } from './typeorm/entities/news';
import { NewsModule } from './news/news.module';

@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'darsoftTechnical',
      entities: [
        Address,
        Countrie,
        UserAddress,
        User,
        News
      ],
      synchronize:  false ,
      migrationsRun: false,
      dropSchema: false
    }),
    UsersModule, 
    AdminModule,
    AuthModule,
    NewsModule
  ],
  controllers: [AppController],
  providers: [AppService, QueryService],
})
export class AppModule {}
