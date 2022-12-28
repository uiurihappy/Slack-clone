import { Module } from '@nestjs/common';
import { ChannelsService } from '@Src/channels/channels.service';
import { ChannelsController } from '@Src/channels/channels.controller';

@Module({
  providers: [ChannelsService],
  controllers: [ChannelsController],
})
export class ChannelsModule {}
