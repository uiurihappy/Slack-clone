import { UsersService } from '@Src/api/users/users.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UsersModule } from '@Src/api/users/users.module';
import { WorkspacesModule } from './api/workspaces/workspaces.module';
import { ChannelsModule } from './api/channels/channels.module';
import { DMsModule } from './api/dms/dms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import dotenv from 'dotenv';
import { ChannelChats } from './entities/Channelchats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/Dms';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';
import { AuthModule } from '@Src/auth/auth.module';

const getEnv = async () => {
  const response = await axios.get('/test');
  return response.data;
};

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.MYSQL_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        // entities: [__dirname + 'src/entities/**/*.entity.ts'],
        // entities: [__dirname + 'entities/**/*.entity{.ts, .js}'],
        // entities: [__dirname + './**/*.entity.{js,ts}'],
        // entities: [__dirname + '/src/**/*.{js,ts}'],
        entities: [
          ChannelChats,
          ChannelMembers,
          Channels,
          DMs,
          Mentions,
          Users,
          WorkspaceMembers,
          Workspaces,
        ],
        // entities:
        //   process.env.NODEMON_START === 'TRUE'
        //     ? ['src/entities/*.entity{.ts,.js}']
        //     : ['./dist/src/entities/*.entity{.ts,.js}'],
        keepConnectionAlive: true,
        synchronize: false,
        logging: true,
        charset: 'utf8mb4',
      }),
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DMsModule,
    AuthModule,
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
