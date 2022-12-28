import { Module } from '@nestjs/common';
import { ChannelsService } from '@Src/api/channels/channels.service';
import { ChannelsController } from '@Src/api/channels/channels.controller';

@Module({
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
