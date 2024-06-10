import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/typeorm/entities/news';
import { createNewsParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return this.newsRepository.find({ order: { createdAt: 'DESC' } });
  }

  async create(createNewsDetails : createNewsParams ): Promise<News> {
    const news = await this.newsRepository.create({ title :createNewsDetails.title, description : createNewsDetails.description , createdAt :new Date()  });
    return this.newsRepository.save(news);
  }
}
