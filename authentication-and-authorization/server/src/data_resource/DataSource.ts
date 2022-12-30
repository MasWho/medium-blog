import IDataProvider from "../data_provider/IDataProvider";

export default abstract class DataSource<Resource> {
  protected _provider: IDataProvider<Resource>;

  constructor(args: {provider: IDataProvider<Resource>}) {
    this._provider = args.provider;
  };

  public get provider(): IDataProvider<Resource> {
    return this._provider;
  }

  abstract create(resource: Resource): Promise<void>;

  abstract get(args: {id: string, matchField: string}): Promise<Resource>;

  abstract update(args: {id: string, resource: Resource}): Promise<void>;

  abstract delete(id: string): Promise<void>;
}