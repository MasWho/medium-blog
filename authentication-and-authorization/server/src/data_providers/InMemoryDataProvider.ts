// server/src/data_providers/InMemoryDataProvider.ts

import IDataProvider from "./IDataProvider";

export default class InMemoryDataProvider<Resource extends {id: string, data: any}> implements IDataProvider<Resource> {
  private _data: Resource[];
  
  constructor() {
    this._data = [];
  };

  public async createData(resource: Resource) {
    this._data.push(resource);
    return;
  }

  public async readData(args: {id: string, matchField: string}) {
    return this._data.filter(x => x.data[args.matchField] === args.id)[0];
  };

  public async updateData(props: { id: string; resource: Resource; }) {
    const {id, resource} = props;
    for(const datum of this._data) {
      if(datum.id === id) {
        datum.data = resource.data;
      }
    }

    return;
  };

  public async deleteData(id: string) {
    this._data = this._data.filter(datum => datum.id !== id);
    return;
  };
}