/* eslint-disable import/no-cycle */
import { getLocalStorage } from './localstorage.js';

// eslint-disable-next-line import/no-mutable-exports
let tasks = getLocalStorage();
const addTaskToTasksArray = (desc, completed = false) => {
  const index = tasks.length + 1;
  const newTask = { desc, completed, index };
  tasks = [...tasks, newTask];
};

const deleteTaskFromArray = (index) => {
  tasks = tasks.filter((task) => task.index !== index)
    .map((task, id) => {
      task.index = id + 1;
      return task;
    });
};
const editTaskDescription = (index, value) => {
  tasks = tasks.map((task) => {
    if (task.index === +index) {
      task.desc = value;
    }
    return task;
  });
};
const updateCompletionStatus = (index) => {
  tasks = tasks.map((task) => {
    if (task.index === index) {
      task.completed = !task.completed;
    }
    return task;
  });
};

const clearAllCompletedTasks = () => {
  tasks = tasks.filter((task) => !task.completed);
};

export {
  tasks,
  addTaskToTasksArray,
  deleteTaskFromArray,
  editTaskDescription,
  updateCompletionStatus,
  clearAllCompletedTasks,
};
