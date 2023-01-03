// server/src/data_providers/IDataProvider.ts

export default interface IDataProvider<Resource> {
  createData: (resource: Resource) => Promise<void>;
  readData: (args: {id: string, matchField: string}) => Promise<Resource>;
  updateData: (args: {id: string, resource: Resource}) => Promise<void>;
  deleteData: (id: string) => Promise<void>;
}