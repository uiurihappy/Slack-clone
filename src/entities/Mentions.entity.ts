import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Workspaces } from './Workspaces.entity';
import { Users } from './Users.entity';

@Index('ReceiverId', ['receiverId'], {})
@Index('SenderId', ['senderId'], {})
@Index('WorkspaceId', ['workspaceId'], {})
@Entity('mentions', { schema: 'sleact' })
export class Mentions {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('enum', { name: 'category', enum: ['chat', 'dm', 'system'] })
  category: 'chat' | 'dm' | 'system';

  @Column('int', { name: 'ChatId', nullable: true })
  chatId: number | null;

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

  @Column('int', { name: 'WorkspaceId', nullable: true })
  workspaceId: number | null;

  @Column('int', { name: 'SenderId', nullable: true })
  senderId: number | null;

  @Column('int', { name: 'ReceiverId', nullable: true })
  receiverId: number | null;

  @ManyToOne(() => Workspaces, workspaces => workspaces.mentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }])
  workspace: Workspaces;

  @ManyToOne(() => Users, users => users.mentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'ReceiverId', referencedColumnName: 'id' }])
  receiver: Users;

  @ManyToOne(() => Users, users => users.mentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'SenderId', referencedColumnName: 'id' }])
  sender: Users;
}
