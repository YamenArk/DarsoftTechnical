import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewsService } from '../news/news.service';

@WebSocketGateway()
export class GatewayService implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly newsService: NewsService) {}

  handleConnection(user: Socket) {
    
    console.log(`User connected: ${user.id}`);
    this.sendLatestNews(user);
  }

  handleDisconnect(user: Socket) {
    console.log(`Client disconnected: ${user.id}`);
  }

  @SubscribeMessage('getLatestNews')
  async handleGetLatestNews(user: Socket): Promise<void> {
    this.sendLatestNews(user);
  }

  async handleNewsAdded(news: any) {
    this.server.emit('newsAdded', news);
  }

  private async sendLatestNews(user: Socket) {
    const news = await this.newsService.findAll();
    user.emit('latestNews', news);
  }
}
