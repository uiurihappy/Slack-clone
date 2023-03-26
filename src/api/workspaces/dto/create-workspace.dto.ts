import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @ApiProperty({
    example: 'sleact',
    description: 'workspace name',
  })
  public workspace: string;

  @IsString()
  @ApiProperty({
    example: 'slack',
    description: 'url Address',
  })
  public url: string;
}
