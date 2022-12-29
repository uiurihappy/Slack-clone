import { UserDto } from './dto/user.dto';
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
import { UsersService } from '@Src/api/users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@Src/common/decorator/user.decorator';

@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiResponse({
    status: 500,
    description: '서버 에러',
  })
  @ApiOperation({ summary: '내 정보 조회' })
  @Get()
  async getUsers(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '회원가입' })
  @Post()
  async postUsers(@Body() data: JoinRequestDto, @Query() query) {
    this.usersService.postUsers(data.email, data.nickname, data.password);
    return;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  async login(@User() user) {
    return user;
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
