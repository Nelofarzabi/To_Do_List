import './style.css';
import { v4 as uuidv4 } from 'uuid';

const taskContainer = document.querySelector('.list_container');
const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    id: uuidv4(),
  },
  {
    description: 'complete To Do list project',
    completed: false,
    id: uuidv4(),
  },
];

const populateTasks = () => {
  const element = tasks.map((task) => {
    const li = `  <li class="list_item">
        <div>
            <input type="checkbox" name="" id="">
            <p>${task.description}</p>
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
    </li>`;
    return li;
  }).join('');
  taskContainer.insertAdjacentHTML('beforeend', element);
};

window.addEventListener('DOMContentLoaded', populateTasks);
