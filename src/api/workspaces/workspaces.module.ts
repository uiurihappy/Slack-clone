import { Module } from '@nestjs/common';
import { WorkspacesService } from '@Src/api/workspaces/workspaces.service';
import { WorkspacesController } from '@Src/api/workspaces/workspaces.controller';
import { Workspaces } from '@Entities/Workspaces';
import { Users } from '@Entities/Users';
import { WorkspaceMembers } from '@Entities/WorkspaceMembers';
import { ChannelMembers } from '@Entities/ChannelMembers';
import { Channels } from '@Entities/Channels';

@Module({
  imports: [Workspaces, Users, WorkspaceMembers, ChannelMembers, Channels],
  providers: [WorkspacesService],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
