class Task {
    constructor(name, duration, dependencies = []) {
      this.name = name;
      this.duration = duration;
      this.dependencies = dependencies;
      this.earliestStart = 0;
      this.latestStart = Infinity;//te liczymy
      this.earliestFinish = this.duration;
      this.latestFinish = Infinity;//te liczymy
    }
}
  
// function findCPM(tasks) {
//     tasks = calculateTasksParameters(tasks);
//     console.log(tasks);
//     tasks = tasks.filter((task) => task.earliestStart === task.latestStart);
//     console.log(tasks);
//     return tasks
// }

// function calculateTasksParameters(tasks) {
  
//   //earliestStart i earliestFinish
//   tasks.forEach((task) => {
//     task.dependencies.forEach((dependencyName) => {
//       const dependency = tasks.find((t) => t.name === dependencyName);
//       task.earliestStart = Math.max(
//         task.earliestStart,
//         dependency.earliestFinish
//       );
//       task.earliestFinish = task.earliestStart + task.duration;
//     });
//   });
//   //latestStart i latestFinish
//   let pDuratuion = tasks[tasks.length - 1].earliestFinish;
//   tasks
//       .slice()
//       .reverse()
//       .forEach((task) => {
//         if (task.latestStart === Infinity) {
//           task.latestStart = pDuratuion - task.duration;
//         }
//         task.latestFinish = task.latestStart + task.duration;
//         task.dependencies.forEach((dependencyName) => {
//           const dependency = tasks.find((t) => t.name === dependencyName);
//           dependency.latestFinish = Math.min(
//             dependency.latestFinish,
//             task.latestStart
//           );
//           dependency.latestStart = dependency.latestFinish - dependency.duration;
//         });
//       });
//   tasks.forEach((task) => {
//      task.latestStart = Math.abs(task.latestStart);
//      task.latestFinish = Math.abs(task.latestFinish);
//   });
//   return tasks;
// }

function calculateEarliestStart(tasks) {
  tasks.forEach((task) => {
    task.dependencies.forEach((dependencyName) => {
      const dependency = tasks.find((t) => t.name === dependencyName);
      task.earliestStart = Math.max(
        task.earliestStart,
        dependency.earliestFinish
      );
      task.earliestFinish = task.earliestStart + task.duration;
    });
  });
}

function calculateLatestStart(tasks, projectDuration) {
  tasks
    .slice()
    .reverse()
    .forEach((task) => {
      if (task.latestStart === Infinity) {
        task.latestStart = projectDuration - task.duration;
      }

      task.latestFinish = task.latestStart + task.duration;

      task.dependencies.forEach((dependencyName) => {
        const dependency = tasks.find((t) => t.name === dependencyName);
        dependency.latestFinish = Math.min(
          dependency.latestFinish,
          task.latestStart
        );
        dependency.latestStart = dependency.latestFinish - dependency.duration;
      });
    });
}

function findCPM(tasks) {
  calculateEarliestStart(tasks);
  calculateLatestStart(tasks,tasks[tasks.length - 1].earliestFinish);
  console.log(tasks);
  tasks = tasks.filter((task) => task.earliestStart === task.latestStart);
  console.log(tasks);
  return tasks;
}

export {Task, findCPM};