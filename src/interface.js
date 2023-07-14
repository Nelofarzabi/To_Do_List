/* eslint-disable no-use-before-define */
import {
  addTaskToTasksArray,
  deleteTaskFromArray,
  editTaskDescription,
  tasks,
  updateCompletionStatus,
  clearAllCompletedTasks,
} from './add_and_remove.js';
import { addToLocalStorage } from './localstorage.js';
// import updateCompletionStatus from './complete.js';

const form = document.querySelector('.todo--form');
const formInput = form.querySelector('input');
const taskContainer = document.querySelector('.list--container');
const clearBtn = document.querySelector('.clear--btn');
const enterIcon = document.querySelector('.fa-arrow-turn-down');
const refreshIcon = document.querySelector('.fa-arrows-rotate');
function populateTasks() {
  taskContainer.innerHTML = '';
  const element = tasks.map((task) => {
    const { completed } = task;
    const li = `<li class="list--item">
      <div class="first--flex">
          <input type="checkbox" name="" id=${task.index} class="check" ${completed ? 'checked' : ''} >
          <div class="desc---container">
              <p class="desc ${completed && 'strike--through'}">${task.desc}</p>
              <form action="" class="edit--form">
                <input type="text" name="" id="" class="edit--input">
              </form>
          </div>
      </div>
      <div class="second--flex">
        <i class="fa-solid fa-ellipsis-vertical" data--option=${task.index}></i>
        <i class="fa-solid fa-trash-can" data--trash=${task.index}></i>
      </div>
    </li>`;
    return li;
  }).join('');
  taskContainer.insertAdjacentHTML('beforeend', element);
  const optionsIcon = document.querySelectorAll('.fa-ellipsis-vertical');
  const deleteIcons = document.querySelectorAll('.fa-trash-can');
  const checkBoxes = document.querySelectorAll('.check');

  optionsIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      handleEditAndDeleteOptions(e);
    });
  });

  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      deleteFromUI(e);
      populateTasks();
    });
  });
  checkBoxes.forEach((checkBox) => {
    checkBox.addEventListener('change', (e) => {
      const { id } = e.target;
      const parent = e.target.parentElement.parentElement;
      const pTag = parent.querySelector('.desc');
      pTag.classList.toggle('strike--through');
      updateCompletionStatus(+id);
      addToLocalStorage();
    });
  });
}
/* **Handle Option menu** */
const handleEditAndDeleteOptions = (e) => {
  const index = e.target.dataset.Option;
  const parent = e.target.parentElement.parentElement;
  const editInput = parent.querySelector('.edit--input');
  const desc = parent.querySelector('.desc');
  const editForm = parent.querySelector('.edit--form');
  parent.classList.add('hide--desc');
  editInput.value = desc.textContent;
  editInput.focus();
  editForm.addEventListener('submit', () => {
    const { value } = editInput;
    editTaskDescription(+index, value);
    addToLocalStorage();
    populateTasks();
  });
};

const deleteFromUI = (e) => {
  const index = e.target.dataset.Trash;
  deleteTaskFromArray(+index);
  addToLocalStorage();
};

/* **HANDLE TASK SUBMISSION** */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = formInput;
  if (value) {
    addTaskToTasksArray(value);
    populateTasks();
    addToLocalStorage();
    formInput.value = '';
  }
});
enterIcon.addEventListener('click', () => {
  const { value } = formInput;
  if (value) {
    addTaskToTasksArray(value);
    populateTasks();
    addToLocalStorage();
    formInput.value = '';
  }
});

clearBtn.addEventListener('click', () => {
  clearAllCompletedTasks();
  addToLocalStorage();
  populateTasks();
});
refreshIcon.addEventListener('click', () => window.location.reload());
export default populateTasks;