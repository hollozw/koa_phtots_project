export class requestQueue {
  private num: number;
  private queue: any[];
  private activite: number;
  constructor(num: number = 5) {
    this.num = num;
    this.queue = [];
    this.activite = 0;
  }

  public async add(task) {
    if(this.activite >= this.num) {
      await new Promise((resolve) => this.queue.push(resolve))
    }
    this.activite++;
    try {
      return await task();
    } finally {
      this.activite--;
      if(this.queue.length) this.queue.shift()();
    }
  }
}
