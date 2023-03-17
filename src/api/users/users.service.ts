import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
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

  async postUsers(email: string, nickname: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email, nickname, password },
    });
    if (user) {
      // 이미 존재하는 유저
      throw new Error('User exist');
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      await this.usersRepository.save({
        email,
        nickname,
        password: hashedPassword,
      });
    }
  }
}
