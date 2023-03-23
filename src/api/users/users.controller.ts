import { UserDto } from './dto/user.dto';
import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
import { UsersService } from '@Src/api/users/users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@Src/common/decorator/user.decorator';
import { UndefinedToNullInterceptor } from '@Src/common/interceptors/undefinedToNull.interceptor';
import { HttpExceptionFilter } from '@Src/exception/http-exception.filter';
import { Response, Request } from 'express';
import { LocalAuthGuard } from '@Src/auth/guard/local-auth.guard';
import { LoggedInGuard } from '@Src/auth/guard/logged-in.guard';
import { NotLoggedInGuard } from '@Src/auth/guard/not-logged-in.guard';

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
    return user || false;
  }

  @UseGuards(new NotLoggedInGuard())
  @ApiOperation({ summary: '회원가입' })
  @Post('join')
  async postUsers(@Body() data: JoinRequestDto, @Res() res: Response) {
    const { email, nickname, password } = data;
    res.status(201).json({ message: 'success' });
  }

  @ApiOperation({ summary: '로그인' })
  @UseGuards(LocalAuthGuard) // 권한 체크
  @Post('login')
  async login(@User() user) {
    return user;
  }

  @UseGuards(new LoggedInGuard())
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  async logout(@Req() req, @Res() res) {
    req.logout();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
