import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './Users';

@Index('UserId', ['userId'], {})
@Entity('workspacemembers', { schema: 'sleact' })
export class Workspacemembers {
  @Column('int', { primary: true, name: 'WorkspaceId' })
  workspaceId: number;

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

  @Column('datetime', { name: 'loggedInAt', nullable: true })
  loggedInAt: Date | null;

  @ManyToOne(() => Users, users => users.workspacemembers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'UserId', referencedColumnName: 'id' }])
  user: Users;
}
