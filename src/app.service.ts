import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@Src/api/users/users.service';
import { runInThisContext } from 'vm';
import { Users } from '@Entities/Users';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {}
  async getHello(): Promise<string> {
    // const users: Users = await this.usersService.getUsers();
    this.getWow();
    return this.configService.get('SECRET_KEY');
  }

  async getWow() {
    return;
  }
}
