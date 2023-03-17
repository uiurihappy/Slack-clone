import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users.entity';

@Index('UserId', ['userId'], {})
@Entity('channelMembers', { schema: 'sleact' })
export class ChannelMembers {
  @Column('int', { primary: true, name: 'ChannelId' })
  channelId: number;

  @Column('int', { primary: true, name: 'UserId' })
  userId: number;

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

  @ManyToOne(() => Users, users => users.channelMembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;
}
