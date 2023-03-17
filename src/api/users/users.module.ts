import { Module } from '@nestjs/common';
import { UsersService } from '@Src/api/users/users.service';
import { UsersController } from '@Src/api/users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
