class Database {
  private static instance: Database;
  private store: any;

  private constructor() {
    this.store = {
      'users': []
    };
  }

  public static getInstance(): Database {
    if (!Database.instance) {
        Database.instance = new Database();
    }

    return Database.instance;
  }

  public get(key: string): any {
    return this.store[key];
  }

  public insert(key: string, value: any): void {
    this.store[key].push(value);
  }

  public update(key: string, value: any): void {
    const values = this.store[key];
    values.forEach((v: any, i: number) => {
      if (v.id === value.id) {
        values[i] = value;
      }
    });
    this.store[key] = values;
  }

  public delete(key: string, id: string): void {
    const values = this.store[key];
    const newValues = values.filter((v: any) => v.id !== id);
    this.store[key] = newValues;
  }
}

const database = Database.getInstance();
export default database;