import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workspaces } from '@Entities/Workspaces';
import { Repository } from 'typeorm';
import { Channels } from '@Entities/Channels';
import { WorkspaceMembers } from '@Entities/WorkspaceMembers';
import { ChannelMembers } from '@Entities/ChannelMembers';
import { Users } from '@Entities/Users';

@Injectable()
export class WorkspacesService {
  // 생성자 밖으로 해서 property를 뺄 수도 있다. 그러나,Nest에서 권장하는 방법은 아니다
  // 이유는 해당 서비스를 상속받아 사용할 수도 있기에 응집도를 높여야 하고, 주입 자체도 엉켜버릴 수도 있다.
  constructor(
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Channels)
    private channelsRepository: Repository<Channels>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepository: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepository: Repository<ChannelMembers>,
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findById(id: number) {
    return this.workspacesRepository.findOne({
      where: { id },
    });
  }

  async findMyWorkspaces(myId: number) {
    return this.workspacesRepository.find({
      where: {
        WorkspaceMembers: [{ UserId: myId }],
      },
    });
  }

  async createWorkspace(name: string, url: string, myId: number) {
    const workspace = this.workspacesRepository.create({
      name,
      url,
      OwnerId: myId,
    });

    const returned = await this.workspacesRepository.save(workspace);

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.UserId = myId;
    workspaceMember.WorkspaceId = returned.id;
    const channel = new Channels();
    channel.name = '일반';
    channel.WorkspaceId = returned.id;
    const [, channelReturned] = await Promise.all([
      this.workspaceMembersRepository.save(workspaceMember),
      this.channelsRepository.save(channel),
    ]);
    const channelMember = new ChannelMembers();
    channelMember.UserId = myId;
    channelMember.ChannelId = channelReturned.id;
    await this.channelMembersRepository.save(channelMember);
  }

  async getWorkspaceMembers(url: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .innerJoin('user.WorkspaceMembers', 'workMembers')
      // sql injection 막기 위함
      .innerJoin('workMembers.Workspace', 'workspace', 'workspace.url = :url', {
        url,
      })
      // getRawMany와 getMany의 차이
      // getRawMany: ID, EMAIL, PASSWORD, Workspace.NAME, Workspace.URL
      // getMany: 객체로 만들어서 return 해준다.
      .getMany();
  }

  async getWorkspaceMember(url: string, id: number) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .innerJoin('user.Workspaces', 'workspaces', 'workspaces.url = :url', {
        url,
      })
      .getOne();
  }

  async createWorkspaceMembers(url: string, email: string) {
    const workspace = await this.workspacesRepository.findOne({
      where: { url },
      relations: ['Channels'],
      // join: {
      //   alias: 'workspace',
      //   innerJoinAndSelect: {
      //     channels: 'workspace.Channels',
      //   },
      // },
    });

    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;

    const workspaceMember = new WorkspaceMembers();
    workspaceMember.WorkspaceId = workspace.id;
    workspaceMember.UserId = user.id;
    await this.workspaceMembersRepository.save(workspaceMember);
    const channelMember = new ChannelMembers();
    channelMember.ChannelId = workspace.Channels.find(
      v => v.name === '일반',
    ).id;
    channelMember.UserId = user.id;
    await this.channelMembersRepository.save(channelMember);
  }
}
