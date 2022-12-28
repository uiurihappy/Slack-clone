import { Module } from '@nestjs/common';
import { UsersService } from '@Src/api/users/users.service';
import { UsersController } from '@Src/api/users/users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
