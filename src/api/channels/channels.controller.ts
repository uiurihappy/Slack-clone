import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  async getAllChannel() {}

  @Post()
  async createChannel() {}

  @Get(':name')
  async getSpecificChannel(@Param('name') name: string) {}

  @Get(':name/chats')
  async getChats(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':name/chats')
  async postChat(@Body() data) {
    return;
  }

  @Get(':name/members')
  async getAllMembers() {}

  @Post(':name/members')
  async inviteMembers() {}
}
