import { Module } from '@nestjs/common';
import { ChannelsService } from '@Src/api/channels/channels.service';
import { ChannelsController } from '@Src/api/channels/channels.controller';
import { Channels } from '@Entities/Channels';
import { ChannelMembers } from '@Entities/ChannelMembers';
import { Workspaces } from '@Entities/Workspaces';
import { ChannelChats } from '@Entities/Channelchats';
import { Users } from '@Entities/Users';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Channels,
      ChannelMembers,
      Workspaces,
      ChannelChats,
      Users,
    ]),
  ],
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
