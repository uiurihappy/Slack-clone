import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '@Entities/Users';
import { DataSource, Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { HttpExceptionFilter } from '@Src/exception/http-exception.filter';
import { JoinRequestDto } from '@Src/api/users/dto/join.request.dto';
import { WorkspaceMembers } from '@Entities/WorkspaceMembers';
import { ChannelMembers } from '@Entities/ChannelMembers';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    private dataSource: DataSource,
  ) {}
  async getUsers(users: Users) {
    const { email, nickname, password } = users;
    const user = await this.usersRepository.findOne({
      where: { email, nickname, password },
    });
    if (user) return user;
    else {
      throw new Error('User not found');
    }
  }

  async join(
    email: string,
    nickname: string,
    password: string,
  ): Promise<JoinRequestDto> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    /**
     * typeorm 처음 만들었던 connection을 사용할거냐가 관건
     * await this.repo로 구현한 것은 트랜잭션이 안먹힌다.
     * 그래서 queryRunner로 만든 repo만 적용되니 manager에서 repository를 불러온다.
     */
    const user = await queryRunner.manager.getRepository(Users).findOne({
      where: { email },
    });
    if (user) {
      // 이미 존재하는 유저
      throw new HttpException('User exist', 461);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
      const returnUser = await queryRunner.manager.getRepository(Users).save({
        email,
        nickname,
        password: hashedPassword,
      });
      // throw new Error('롤백 check');
      await queryRunner.manager.getRepository(WorkspaceMembers).save({
        UserId: returnUser.id,
        WorkspaceId: 1,
      });
      await queryRunner.manager.getRepository(ChannelMembers).save({
        UserId: returnUser.id,
        ChannelId: 1,
      });
      await queryRunner.commitTransaction();
      return returnUser;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'nickname'],
    });
  }
}
