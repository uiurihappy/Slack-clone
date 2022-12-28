import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from '@Src/users/dto/join.request.dto';
import { UsersService } from '@Src/users/users.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: '내 정보 확인' })
  @Get()
  async getUsers(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async postUsers(@Body() data: JoinRequestDto, @Query() query) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
    return;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
