/* eslint-disable import/no-cycle */
import { tasks } from './add_and_remove.js';

const addToLocalStorage = () => {
  localStorage.setItem('task', JSON.stringify(tasks));
};
const getLocalStorage = () => (localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task')) : []);

export { addToLocalStorage, getLocalStorage };