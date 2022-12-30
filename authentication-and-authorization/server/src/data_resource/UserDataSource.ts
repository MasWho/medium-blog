import IDataProvider from "../data_provider/IDataProvider";
import DataSource from "./DataSource";
import User from "./User";

export default class UserDataSource extends DataSource<User> {
  constructor(args: {provider: IDataProvider<User>}) {
    super({provider: args.provider});
  }

  public async create(user: User) {
    this.provider.createData(user);
    return;
  }

  public async get(args: {id: string, matchField: string}) {
    return this.provider.readData({id: args.id, matchField: args.matchField});
  }

  public async update(args: {id: string, resource: User}) {
    this.provider.updateData({id: args.id, resource: args.resource});
    return;
  }

  public async delete(id: string) {
    this.provider.deleteData(id);
    return;
  }
}