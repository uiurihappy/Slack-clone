import { Users } from '@Src/entities/Users.entity';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ChannelChats } from '@Src/entities/ChannelChats.entity';
import { ChannelMembers } from '@Src/entities/ChannelMembers.entity';
import { Channels } from '@Src/entities/Channels.entity';
import { DMs } from '@Src/entities/DMs.entity';
import { Mentions } from '@Src/entities/Mentions.entity';
import { WorkspaceMembers } from '@Src/entities/WorkspaceMembers.entity';
import { Workspaces } from '@Src/entities/Workspaces.entity';

const getEnv = async () => {
  const response = await axios.get('/test');
  return response.data;
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        synchronize: false,
        entities: [
          ChannelChats,
          ChannelMembers,
          Users,
          Channels,
          Workspaces,
          WorkspaceMembers,
          DMs,
          Mentions,
        ],
        // keepConnectionAlive: true,
        logging: ['error'],
        timezone: '+09:00',
      }),
    }),
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
