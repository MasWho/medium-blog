class WorkerService {
  private _id: string;

  constructor() {
    this._id = Math.random().toString(36).substring(7);
  }

  async doWork() {
    // Generate a random number between 1 and 5
    const time = Math.floor(Math.random() * 5) + 1;
    // Sleep for that many seconds
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
    return {id: this._id, time};
  }
}