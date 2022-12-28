import { Module } from '@nestjs/common';
import { WorkspacesService } from '@Src/workspaces/workspaces.service';
import { WorkspacesController } from '@Src/workspaces/workspaces.controller';

@Module({
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
