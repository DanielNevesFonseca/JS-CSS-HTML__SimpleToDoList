const tasks = [
]

function createTaskModel(task) {
  const item = document.createElement('li');
  const taskText = document.createElement('p');
  const deleteTask = document.createElement('span');

  taskText.innerText = task.task;
  deleteTask.innerText = 'Excluir';
  deleteTask.dataset.btnId = task.id;
  item.classList.add('form-group', 'task-item');
  deleteTask.classList.add('btn-delete');

  item.append(taskText, deleteTask);
  return item;
}


function renderAllTasks(tasks) {
  const tasksContainer = document.querySelector('.tasks-container');
  tasksContainer.innerHTML = '';
  tasks.forEach(task => {
    const taskCard = createTaskModel(task);
    tasksContainer.appendChild(taskCard);
    deleteTask(tasks);
  })
  setTasksLocalStorage(tasks);
}

function addNewTask(tasks) {
  const addButton = document.querySelector('.btn-add');
  const input = document.querySelector('.form-group > input');
  addButton.addEventListener('click', () => {
    if (input.value === '') {
      alert("Digite alguma coisa...")
    } else {
      const newTask = {
        id: tasks.length + 1,
        task: input.value,
      }
      tasks.push(newTask);
      renderAllTasks(tasks);
      input.value = '';
    }
    setTasksLocalStorage(tasks);
  })
}

function deleteTask(tasks) {
  const allDeleteButtons = document.querySelectorAll('.btn-delete');
  // console.log(allDeleteButtons)
  allDeleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = Number(event.target.dataset.btnId);
      console.log(id)
      tasks.forEach((task, index) => {
        if (id == task.id) {
          const deleted = tasks.splice(index, 1);
          console.log(deleted)
          renderAllTasks(tasks);
        }
        setTasksLocalStorage(tasks);
      })
    })
  })
}

function setTasksLocalStorage(tasks) {
  const tasksJson = JSON.stringify(tasks);
  localStorage.setItem('tasksUpdate', tasksJson);
}

function getTasksLocalStorage() {
  const tasksLocalStorage = localStorage.getItem('tasksUpdate');
  if (tasksLocalStorage){
    const tasksTranform = JSON.parse(tasksLocalStorage);
    renderAllTasks(tasksTranform);
  } else if (tasksLocalStorage == '[]'){
    localStorage.removeItem('tasksUpdate');
  };
}

addNewTask(tasks);
getTasksLocalStorage()
