import { UserDto } from './dto/user.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
import { UsersService } from '@Src/api/users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@Src/common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from '@Src/common/interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
  @Post('join')
  async postUsers(@Body() data: JoinRequestDto, @Query() query) {
    const { email, nickname, password } = data;
    await this.usersService.postUsers(email, nickname, password);
    return {
      message: `email: ${email}, nickname: ${nickname}, password:${password}`,
    };
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
