import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ChannelChats } from '@Src/entities/ChannelChats.entity';
import { ChannelMembers } from '@Src/entities/ChannelMembers.entity';
import { Channels } from '@Src/entities/Channels.entity';
import { Dms } from '@Src/entities/DMs.entity';
import { Mentions } from '@Src/entities/Mentions.entity';
import { WorkspaceMembers } from '@Src/entities/WorkspaceMembers.entity';
import { Workspaces } from '@Src/entities/Workspaces.entity';
import { Users } from '@Src/entities/Users.entity';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + 'entities/**/*.entity.ts'],
  migrations: [__dirname + '/src/migrations/*.ts'],
  charset: 'utf8mb4_general_ci',
  synchronize: false,
  logging: true,
});

export default dataSource;
