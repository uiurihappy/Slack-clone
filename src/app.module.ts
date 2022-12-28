import { UsersService } from '@Src/api/users/users.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UsersModule } from '@Src/api/users/users.module';
import { WorkspacesModule } from './api/workspaces/workspaces.module';
import { ChannelsModule } from './api/channels/channels.module';
import { DmsModule } from './api/dms/dms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const getEnv = async () => {
  const response = await axios.get('/test');
  return response.data;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
