import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from '@Src/users/dto/join.request.dto';
import { UsersService } from '@Src/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers(@Req() req) {
    return req.user;
  }

  @Post()
  async postUsers(@Body() data: JoinRequestDto, @Query() query) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
    return;
  }

  @Post('login')
  async login(@Req() req) {
    return req.user;
  }

  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
