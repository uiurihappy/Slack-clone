import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async postUsers(email: string, nickname: string, password: string) {
    return;
  }
}
