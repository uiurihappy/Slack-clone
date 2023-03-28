import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

// 웹 소켓 이벤트를 담당
@Module({
  providers: [EventsGateway],
  exports: [EventsGateway],
})
export class EventsModule {}
