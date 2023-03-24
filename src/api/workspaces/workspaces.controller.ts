import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from '@Src/api/workspaces/workspaces.service';
import { User } from '@Src/common/decorator/user.decorator';
import { Users } from '@Entities/Users';
import { CreateWorkspaceDto } from '@Src/api/workspaces/create-workspace.dto';

@ApiTags('WORKSPACE')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get('/:myId')
  async getMyWorkspaces(
    // @Param('myId', ParseIntPipe) myId: number,
    // @Param('keys', new ParseArrayPipe({items: Number, separator: ','})) // 배열일때 구분자 값을 줘서 배열로 parsing, [1, 2, 3]
    @User() user: Users,
  ) {
    const { id: myId } = user;
    return this.workspacesService.findMyWorkspaces(myId);
  }

  @Post()
  async createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }

  @Get(':url/members')
  async getAllMembersFromWorkspace() {}

  @Post(':url/members')
  async inviteMembersToWorkspace() {}

  @Delete(':url/members')
  async kickMembersToWorkspace() {}

  @Get(':url/members/:id')
  async getMemberInfoInWorkspace() {}
}
