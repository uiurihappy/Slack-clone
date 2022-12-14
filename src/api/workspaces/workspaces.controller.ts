import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WORKSPACE')
@Controller('workspaces')
export class WorkspacesController {
  @Get()
  async getMyWorkspaces() {}

  @Post()
  async createWorkspace() {}

  @Get(':url/members')
  async getAllMembersFromWorkspace() {}

  @Post(':url/members')
  async inviteMembersToWorkspace() {}

  @Delete(':url/members')
  async kickMembersToWorkspace() {}

  @Get(':url/members/:id')
  async getMemberInfoInWorkspace() {}
}
