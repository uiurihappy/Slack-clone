import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '@Src/api/users/users.service';
import { runInThisContext } from 'vm';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {}
  async getHello(): Promise<string> {
    this.usersService.getUsers();
    this.getWow();
    return this.configService.get('SECRET_KEY');
  }

  async getWow() {
    return;
  }
}
