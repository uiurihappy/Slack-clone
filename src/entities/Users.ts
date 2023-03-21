import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ChannelChats } from './Channelchats';
import { ChannelMembers } from './ChannelMembers';
import { Channels } from './Channels';
import { DMs } from './Dms';
import { Mentions } from './Mentions';
import { WorkspaceMembers } from './WorkspaceMembers';
import { Workspaces } from './Workspaces';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Index('email', ['email'], { unique: true })
@Entity({ schema: 'sleact', name: 'users' })
export class Users {
  @ApiProperty({
    example: 1,
    description: '유저 ID',
  })
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ybchar@gmail.com',
    description: '이메일',
    required: true,
  })
  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ybchar',
    description: '닉네임',
    required: true,
  })
  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345656',
    description: '비밀번호',
    required: true,
  })
  @Column('varchar', { name: 'password', length: 100, select: false })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => ChannelChats, channelchats => channelchats.User)
  ChannelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, channelmembers => channelmembers.User)
  ChannelMembers: ChannelMembers[];

  @OneToMany(() => DMs, dms => dms.Sender)
  DMs: DMs[];

  @OneToMany(() => DMs, dms => dms.Receiver)
  DMs2: DMs[];

  @OneToMany(() => Mentions, mentions => mentions.Sender)
  Mentions: Mentions[];

  @OneToMany(() => Mentions, mentions => mentions.Receiver)
  Mentions2: Mentions[];

  @OneToMany(() => WorkspaceMembers, workspacemembers => workspacemembers.User)
  WorkspaceMembers: WorkspaceMembers[];

  @OneToMany(() => Workspaces, workspaces => workspaces.Owner)
  OwnedWorkspaces: Workspaces[];

  @ManyToMany(() => Workspaces, workspaces => workspaces.Members)
  @JoinTable({
    name: 'workspacemembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'WorkspaceId',
      referencedColumnName: 'id',
    },
  })
  Workspaces: Workspaces[];

  @ManyToMany(() => Channels, channels => channels.Members)
  @JoinTable({
    name: 'channelmembers',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ChannelId',
      referencedColumnName: 'id',
    },
  })
  Channels: Channels[];
}
