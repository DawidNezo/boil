export default class Task {
    constructor(name, duration, dependencies = []) {
      this.name = name;
      this.duration = duration;
      this.dependencies = dependencies;
      this.earliestStart = 0;
      this.latestStart = Infinity;
      this.earliestFinish = this.duration;
      this.latestFinish = Infinity;
    }
  }