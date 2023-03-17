import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Workspaces } from '@Entities/Workspaces';
import { Channels } from '@Entities/Channels';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // const workspacesRepository = dataSource.getRepository(Workspaces);
    // await workspacesRepository.insert([
    //   {
    //     id: 1,
    //     name: 'Sleact',
    //     url: 'sleact',
    //   },
    // ]);
    // const channelsRepository = dataSource.getRepository(Channels);
    // await channelsRepository.insert([
    //   {
    //     id: 1,
    //     name: '일반',
    //     WorkspaceId: 1,
    //     private: false,
    //   },
    // ]);

    const workspacesFactory = await factoryManager.get(Workspaces);
    await workspacesFactory.save({
      id: 1,
      name: 'Sleact',
      url: 'sleact',
    });
    const channelsRepository = await factoryManager.get(Channels);
    await channelsRepository.save({
      id: 1,
      name: '일반',
      WorkspaceId: 1,
      private: false,
    });
  }
}
