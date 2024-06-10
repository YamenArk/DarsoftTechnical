import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryService } from './middleware/sql/query/query.service';
const mysql = require('mysql2/promise');
import * as dotenv from 'dotenv';



dotenv.config();

async function bootstrap() {
  //sql query to create the database if not exist and then create all the countries
   const queryService = new QueryService();
   await queryService.creatingDatabase();
  const app = await NestFactory.create(AppModule);
  await queryService.creatingCountries();
  await app.listen(3000);
}
bootstrap();
