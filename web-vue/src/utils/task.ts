export class TaskQueue {
  private max: number = 0;
  private running: number = 0;
  private queue: any[] = [];
  constructor(max: number = 5) {
    this.max = max;
  }

  async taskQueue(Task: any) {
    if (this.running >= this.max) {
      await new Promise((resolve) => this.queue.push(resolve("")));
    }
    this.running++;

    try {
      return await Task();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        next();
      }
    }
  }
}
