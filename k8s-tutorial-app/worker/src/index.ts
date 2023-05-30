import WorkerService from "./worker";

const NUM_WORKER_PROCESS = 5;

const workers = [];
setInterval(() => {
  if(workers.length < NUM_WORKER_PROCESS) {
    const worker = new WorkerService();
    workers.push(worker);
  }
}, 1000)