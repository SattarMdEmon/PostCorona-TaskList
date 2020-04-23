// UI variables
const taskInput = document.querySelector("#task-input");
const taskForm = document.querySelector("#task-form");
const collection = document.querySelector("#collection");
const filter = document.querySelector("#filter");
const clear = document.querySelector("#clear");

// Load all event listeners
loadEventListeners();

// Event Listeners Funtion
function loadEventListeners() {
  // //DOM Load Event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add Task Event
  taskForm.addEventListener("submit", addTask);

  // Remove Task Event
  collection.addEventListener("click", removeTask);

  // Clear Task Event
  clear.addEventListener("click", clearTasks);

  // Filter Event
  filter.addEventListener("keyup", filterList);
}

function addTask(e) {
  if (taskInput.value == "") {
    alert("Add a task first, you dumbass!");
  } else {
    appendlist(taskInput.value);
    addToLocalStorage(taskInput.value);
    taskInput.value = "";
  }
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure you want to remove task?")) {
      e.target.parentElement.parentElement.remove();
      removeFromLocalStorage(e);
    }
  }
}

function clearTasks() {
  if (confirm("Are you sure you want to clear all the tasks?")) {
    while (collection.firstChild) {
      collection.firstChild.remove();
      clearTasksFromStorage();
    }
  }
}

function filterList() {
  if (filter.value != "") {
    document.querySelectorAll("li").forEach(function (item) {
      if (
        item.textContent.toLowerCase().search(filter.value.toLowerCase()) == -1
      )
        item.style.display = "none";
      else item.style.display = "flex";
    });
  } else
    document.querySelectorAll("li").forEach(function (item) {
      item.style.display = "flex";
    });
}
// Local Storage Section
function addToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") != null) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(appendlist);
  }
}

function appendlist(task) {
  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(task));
  const link = document.createElement("a");
  link.className = "delete-item";
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);
  collection.appendChild(li);
}

function removeFromLocalStorage(e) {
  let task = e.target.parentElement.parentElement.textContent;
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i] == task) {
      tasks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearTasksFromStorage() {
  localStorage.setItem("tasks", "[]");
}
