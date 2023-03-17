import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChannelChats } from './Channelchats.entity';
import { ChannelMembers } from './Channelmembers.entity';
import { Dms } from './Dms.entity';
import { Mentions } from './Mentions.entity';
import { WorkspaceMembers } from './Workspacemembers.entity';
import { Workspaces } from './Workspaces.entity';

@Index('email', ['email'], { unique: true })
@Entity('users', { schema: 'sleact' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'email', unique: true, length: 30 })
  email: string;

  @Column('varchar', { name: 'nickname', length: 30 })
  nickname: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @Column('datetime', {
    name: 'createdAt',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updatedAt',
    default: () => "'CURRENT_TIMESTAMP(6)'",
  })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => ChannelChats, channelchats => channelchats.user)
  channelChats: ChannelChats[];

  @OneToMany(() => ChannelMembers, channelmembers => channelmembers.user)
  channelMembers: ChannelMembers[];

  @OneToMany(() => Dms, dms => dms.receiver)
  dms: Dms[];

  @OneToMany(() => Dms, dms => dms.sender)
  dms2: Dms[];

  @OneToMany(() => Mentions, mentions => mentions.receiver)
  mentions: Mentions[];

  @OneToMany(() => Mentions, mentions => mentions.sender)
  mentions2: Mentions[];

  @OneToMany(() => WorkspaceMembers, workspaceMembers => workspaceMembers.user)
  workspaceMembers: WorkspaceMembers[];

  @OneToMany(() => Workspaces, workspaces => workspaces.owner)
  workspaces: Workspaces[];
}
