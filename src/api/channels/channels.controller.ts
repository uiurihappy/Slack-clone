import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  async getAllChannel() {}

  @Post()
  async createChannel() {}

  @Get(':name')
  async getChannel() {}

  @Get(':name/chats')
  async getChat(@Query() query, @Param() param) {
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
