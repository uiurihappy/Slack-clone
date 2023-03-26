import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from './src/entities/Channelchats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { Channels } from './src/entities/Channels';
import { DMs } from './src/entities/Dms';
import { Mentions } from './src/entities/Mentions';
import { Users } from './src/entities/Users';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Workspaces } from './src/entities/Workspaces';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
  // entities: [__dirname + 'src/entities/**/*.{js,ts}'],
  // entities: [__dirname + '/src/**/*.{js,ts}'],
  // entities:
  //   process.env.NODEMON_START === 'TRUE'
  //     ? ['src/entities/*.entity{.ts,.js}']
  //     : ['./dist/src/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + './src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: true,
  logging: process.env.NODE_ENV !== 'production',
});

export default dataSource;
