// server/src/repositories/Repository.ts

import IDataProvider from "../data_providers/IDataProvider";

export default class Repository<Resource> {
  protected _provider: IDataProvider<Resource>;

  constructor(args: {provider: IDataProvider<Resource>}) {
    this._provider = args.provider;
  };

  public get provider(): IDataProvider<Resource> {
    return this._provider;
  }
}