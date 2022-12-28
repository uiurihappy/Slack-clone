import { Module } from '@nestjs/common';
import { UsersService } from '@Src/users/users.service';
import { UsersController } from '@Src/users/users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
