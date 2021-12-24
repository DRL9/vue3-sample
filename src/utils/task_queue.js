/**
 * 用于限制异步函数的最大并行数量
 */
export class TaskQueue {
  constructor(maxCount) {
    this.maxCount = maxCount;
    this.runningCount = 0;
    this._taskPending = [];
  }
  /**
   *
   * @param {()=>Promise} fn
   */
  runTask(fn) {
    return new Promise((resolve, reject) => {
      this._taskPending.push({ resolve, reject, fn });
      this._exec();
    });
  }
  cancelTask(fn) {
    let idx = this._taskPending.findIndex((task) => task.fn === fn);
    if (idx > -1) {
      this._taskPending.splice(idx, 1);
    }
  }
  _exec() {
    if (this._taskPending.length === 0) {
      return;
    }
    if (this.runningCount < this.maxCount) {
      this.runningCount++;
      const { fn, resolve, reject } = this._taskPending.shift();
      fn()
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._exec();
        });
    }
  }
}
