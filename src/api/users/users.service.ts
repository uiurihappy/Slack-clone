import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { HttpExceptionFilter } from '@Src/exception/http-exception.filter';
import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async getUsers(users: Users) {
    const { email, nickname, password } = users;
    const user = await this.usersRepository.findOne({
      where: { email, nickname, password },
    });
    if (user) return user;
    else {
      throw new Error('User not found');
    }
  }

  async join(
    email: string,
    nickname: string,
    password: string,
  ): Promise<JoinRequestDto> {
    // if (!email) {
    //   throw new HttpException('이메일이 없습니다.', 400);
    // } else if (!nickname) {
    //   throw new HttpException('닉네임이 없습니다.', 400);
    // } else if (!password) {
    //   throw new HttpException('비밀번호가 없습니다.', 400);
    // }

    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (user) {
      // 이미 존재하는 유저
      throw new HttpException('User exist', 461);
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      return await this.usersRepository.save({
        email,
        nickname,
        password: hashedPassword,
      });
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }
}
