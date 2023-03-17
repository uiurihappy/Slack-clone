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
        entities: [__dirname + 'entities/**/*.entity.ts'],
        keepConnectionAlive: true,
        logging: true,
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
