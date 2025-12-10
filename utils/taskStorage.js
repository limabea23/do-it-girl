const tasksByDate = {};

export function addTask(date, task) {
  if (!tasksByDate[date]) tasksByDate[date] = [];
  tasksByDate[date].push(task);
}

export function getTasks(date) {
  return tasksByDate[date] || [];
}
