import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;

  //   @ApiProperty({
  //     required: true,
  //     example: 'test@test.com',
  //     description: '이메일',
  //   })
  //   email: string;
}
