import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';
import { AuthService } from '@Src/auth/auth.service';
import { LocalSerializer } from '@Src/auth/serializer/local.serializer';
import { LocalStrategy } from '@Src/auth/strategy/local.strategy';
import { UsersModule } from '@Src/api/users/users.module';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([Users]),
    UsersModule,
  ],
  providers: [AuthService, LocalSerializer, LocalStrategy],
})
export class AuthModule {}
