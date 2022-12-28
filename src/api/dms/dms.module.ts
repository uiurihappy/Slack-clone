import { DmsController } from '@Src/Dms/dms.controller';
import { DmsService } from '@Src/Dms/dms.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [DmsService],
  controllers: [DmsController],
})
export class DmsModule {}
