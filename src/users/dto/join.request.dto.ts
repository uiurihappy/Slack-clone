import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class JoinRequestDto {
  @ApiProperty({
    example: 'ybchar@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    example: 'ybchar',
    description: '닉네임',
    required: true,
  })
  @IsString()
  public nickname: string;

  @ApiProperty({
    example: '12345656',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  public password: string;
}
