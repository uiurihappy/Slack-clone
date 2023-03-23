import { Module } from '@nestjs/common';
import { UsersService } from '@Src/api/users/users.service';
import { UsersController } from '@Src/api/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';
import { WorkspaceMembers } from '@Entities/WorkspaceMembers';
import { ChannelMembers } from '@Entities/ChannelMembers';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
