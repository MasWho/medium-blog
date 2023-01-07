// server/src/repositories/UserRepository.ts

import IDataProvider from "../data_providers/IDataProvider";
import Repository from "./Repository";
import { randomUUID } from "crypto";
import InMemoryDataProvider from "../data_providers/InMemoryDataProvider";

type UserData = {
  email: string,
  name: string,
  password: string,
  createdAt: string,
  updatedAt: string
};

export class UserResource {
  private _id: string;

  constructor(private _data: UserData) {
    this._id = randomUUID();
  };

  public get id(): string {
    return this._id;
  }

  public get data(): UserData {
    return this._data;
  }
}

export class UserRepository extends Repository<UserResource> {
  constructor(args: {provider: IDataProvider<UserResource>}) {
    super({provider: args.provider});
  }

  public async createUser(user: UserResource) {
    await this.provider.createData(user);
    return;
  }

  public async getUserBy(args: {id: string, matchField: string}) {
    return this.provider.readData({id: args.id, matchField: args.matchField});
  }
}

const dataProvider = new InMemoryDataProvider<UserResource>();
const userRepository = new UserRepository({provider: dataProvider});

export default userRepository;