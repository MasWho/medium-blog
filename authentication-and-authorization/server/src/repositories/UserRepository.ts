import IDataProvider from "../data_providers/IDataProvider";
import Repository from "./Repository";
import { randomUUID } from "crypto";
import { GenericResource } from "../types/generic";

type UserData = {
  email: string,
  name: string,
  password: string,
  createdAt: string,
  updatedAt: string
};

export class User implements GenericResource<UserData> {
  public id: string;

  constructor(public data: UserData) {
    this.id = randomUUID();
  };
}

export default class UserRepository extends Repository<User> {
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