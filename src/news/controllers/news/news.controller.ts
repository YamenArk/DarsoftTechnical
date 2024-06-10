import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { JWTAuthGuardAdmin } from 'src/middleware/auth/jwt-auth.guard';
import { createNewsDto } from 'src/news/dtos/createNews.dto';
import { GatewayService } from 'src/news/services/gateway/gateway.service';
import { NewsService } from 'src/news/services/news/news.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly newsGateway: GatewayService,
  ) {}

  @Get()
  async findAll() {
    const news = await  this.newsService.findAll();
    return {news : news}
  }

  @Post()
  @UseGuards(JWTAuthGuardAdmin)
  async create(@Body() createNewsDetails: createNewsDto) {
    const news = await this.newsService.create(createNewsDetails);
    this.newsGateway.handleNewsAdded(news);
    return {message : 'news created successfully'}
  }
}
