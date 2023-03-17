import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Channels } from './Channels';
import { Dms } from './Dms';
import { Mentions } from './Mentions';
import { Users } from './Users';

@Index('url', ['url'], { unique: true })
@Index('name', ['name'], { unique: true })
@Index('OwnerId', ['ownerId'], {})
@Entity('workspaces', { schema: 'sleact' })
export class Workspaces {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 30 })
  name: string;

  @Column('varchar', { name: 'url', unique: true, length: 30 })
  url: string;

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

  @Column('int', { name: 'OwnerId', nullable: true })
  ownerId: number | null;

  @OneToMany(() => Channels, channels => channels.workspace)
  channels: Channels[];

  @OneToMany(() => Dms, dms => dms.workspace)
  dms: Dms[];

  @OneToMany(() => Mentions, mentions => mentions.workspace)
  mentions: Mentions[];

  @ManyToOne(() => Users, users => users.workspaces, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }])
  owner: Users;
}
