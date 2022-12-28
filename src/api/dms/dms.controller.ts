import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  async getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.page);
    console.log(param.id, param.url);
  }

  @Post(':id/chats')
  async postChat(@Body() data) {
    return;
  }
}
