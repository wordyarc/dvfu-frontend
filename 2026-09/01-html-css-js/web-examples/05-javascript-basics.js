const title = "Изучить JavaScript";
let completed = false;

console.log("title:", title);
console.log("completed:", completed);

completed = true;
console.log("после изменения:", completed);

const tasks = [
  { title: "HTML", completed: true },
  { title: "CSS", completed: false },
  { title: "DOM", completed: false },
];

const activeTasks = tasks.filter((task) => !task.completed);
const taskTitles = tasks.map((task) => task.title);

console.log("активные задачи:", activeTasks);
console.log("все названия:", taskTitles);

const task = {
  title: "JavaScript",
  assignee: null,
};

console.log(task.assignee?.name ?? "Исполнитель не назначен");

console.log("5" + 1);
console.log(Number("5") + 1);
console.log(0 || 10);
console.log(0 ?? 10);

console.log("Начало");

setTimeout(() => {
  console.log("Таймер");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("Конец");
