import { DmsController } from '@Src/api/Dms/dms.controller';
import { DmsService } from '@Src/api/Dms/dms.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [DmsService],
  controllers: [DmsController],
})
export class DMsModule {}
