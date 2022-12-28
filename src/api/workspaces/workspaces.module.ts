import { Module } from '@nestjs/common';
import { WorkspacesService } from '@Src/api/workspaces/workspaces.service';
import { WorkspacesController } from '@Src/api/workspaces/workspaces.controller';

@Module({
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
