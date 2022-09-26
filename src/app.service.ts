import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  async getHello(): Promise<string> {
    return this.configService.get('SECRET_KEY');
  }
}
