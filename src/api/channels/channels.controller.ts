import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@Src/common/decorator/user.decorator';
import { ChannelsService } from '@Src/api/channels/channels.service';
import { CreateChannelDto } from '@Src/api/channels/dto/create-channel.dto';
import { Users } from '@Entities/Users';
import { FilesInterceptor } from '@nestjs/platform-express';

import fs from 'fs';
import multer from 'multer';
import path from 'path';

try {
  fs.readdirSync('uploads');
} catch (err) {
  console.log(err);
  console.error('uploads 폴더가 없어 uploads 폴더를 생성');
  fs.mkdirSync('uploads');
}

@ApiTags('CHANNEL')
@Controller('/workspaces')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @ApiOperation({ summary: '워크스페이스 채널 모두 가져오기' })
  @Get(':url/channels')
  async getWorkspaceChannels(@Param('url') url, @User() user) {
    return this.channelsService.getWorkspaceChannels(url, user.id);
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 가져오기' })
  @Get(':url/channels/:name')
  async getWorkspaceChannel(@Param('url') url, @Param('name') name) {
    return this.channelsService.getWorkspaceChannel(url, name);
  }

  @ApiOperation({ summary: '워크스페이스 채널 만들기' })
  @Post(':url/channels')
  async createWorkspaceChannels(
    @Param('url') url,
    @Body() body: CreateChannelDto,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannels(
      url,
      body.name,
      user.id,
    );
  }

  @ApiOperation({ summary: '워크스페이스 채널 멤버 가져오기' })
  @Get(':url/channels/:name/members')
  async getWorkspaceChannelMembers(
    @Param('url') url: string,
    @Param('name') name: string,
  ) {
    return this.channelsService.getWorkspaceChannelMembers(url, name);
  }

  @ApiOperation({ summary: '워크스페이스 채널 멤버 초대하기' })
  @Post(':url/channels/:name/members')
  async createWorkspaceMembers(
    @Param('url') url: string,
    @Param('name') name: string,
    @Body('email') email,
  ) {
    return this.channelsService.createWorkspaceChannelMembers(url, name, email);
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 채팅 모두 가져오기' })
  @Get(':url/channels/:name/chats')
  async getWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Query('perPage', ParseIntPipe) perPage: number,
    @Query('page', ParseIntPipe) page: number,
  ) {
    return this.channelsService.getWorkspaceChannelChats(
      url,
      name,
      perPage,
      page,
    );
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 채팅 생성하기' })
  @Post(':url/channels/:name/chats')
  async createWorkspaceChannelChats(
    @Param('url') url,
    @Param('name') name,
    @Body('content') content,
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannelChats(
      url,
      name,
      content,
      user.id,
    );
  }

  @ApiOperation({ summary: '워크스페이스 특정 채널 이미지 업로드하기' })
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'uploads/');
        },
        filename(req, file, cb) {
          const ext = path.extname(file.originalname);
          cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    }),
  )
  @Post(':url/channels/:name/images')
  async createWorkspaceChannelImages(
    @Param('url') url,
    @Param('name') name,
    @UploadedFiles() files: Express.Multer.File[],
    @User() user: Users,
  ) {
    return this.channelsService.createWorkspaceChannelImages(
      url,
      name,
      files,
      user.id,
    );
  }

  @ApiOperation({ summary: '안 읽은 개수 가져오기' })
  @Get(':url/channels/:name/unreads')
  async getUnreads(
    @Param('url') url,
    @Param('name') name,
    @Query('after', ParseIntPipe) after: number,
  ) {
    return this.channelsService.getChannelUnreadsCount(url, name, after);
  }
}
