//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const deleteBtn = document.getElementById("delete-btn");
const checkedBtn = document.getElementById("checked-btn");
const alertText = document.querySelector(".alert-text");
const form = document.querySelector("form");
let dark = document.querySelector("#dark-theme");
let body = document.getElementsByTagName("BODY")[0];
let light = document.querySelector("#light");
//EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodo);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", editTodo);

//GET TODO FUNCTION

function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    showTodo(todo);
  });
}
//EDIT TODO FUNCTION

function editTodo(e) {
  const editBtn = e.target;
  const todoElm = editBtn.parentElement;
  if (editBtn.id === "delete-btn") {
    console.log(todoElm);
    removeLocalStorage(todoElm.innerText);
    todoElm.classList.add("fall");
    setTimeout(() => {
      todoElm.remove();
    }, 500);
  }
  if (editBtn.id === "checked-btn") {
    if (todoElm.classList.contains("todo-item-checked")) {
      todoElm.classList.remove("todo-item-checked");
    } else {
      todoElm.classList.add("todo-item-checked");
    }
  }
}

//ADD TODO FUNCTION
function addTodo(e) {
  e.preventDefault();
  const todoText = todoInput.value;
  if (!todoText) {
    alertText.style.display = "block";
    form.classList.add("form-alert");
    setTimeout(() => {
      alertText.style.display = "none";
      form.classList.remove("form-alert");
    }, 1500);
    return;
  }

  showTodo(todoText);
  saveLocalStorage(todoText);
  // clear old value from input
  todoInput.value = "";
}
//SHOW TODO FUNCTION
function showTodo(todoText) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.innerHTML = `
      <p>${todoText}</p>
      <button id="delete-btn" class="todo-btn">
      <i class="far fa-trash-alt"></i>
      </button>
      <button id="checked-btn" class="todo-btn">
      <i class="fas fa-clipboard-check"></i>
      </button>`;
  todoList.appendChild(todoItem);
}
//SAVE FUNCTION
function saveLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//REMOVE FUNCTION
function removeLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  console.log(todo);
  console.log(todos);
  const todoIndex = todos.indexOf(todo);
  console.log(todos.indexOf(todo));
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
//change theme
dark.addEventListener("click", () => {
  body.classList.remove("dark");
});

light.addEventListener("click", () => {
  body.classList.add("dark");
});
