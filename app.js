const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");


// Make the enter key work to add the item to the todo list
todoInput.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addBtn.click();
    }
});


let todos = [];

// Check local storage for existing todos
if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodos();
}

// Add new todo
addBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false,
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = "";
    }
});

// Edit todo
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("todo-text")) {
        const todoId = parseInt(event.target.parentElement.dataset.id);
        const todo = todos.find((todo) => todo.id === todoId);
        const updatedTodo = prompt("Edit todo:", todo.text);
        if (updatedTodo !== null) {
            todo.text = updatedTodo.trim();
            saveTodos();
            renderTodos();
        }
    }
});

// Delete todo
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const todoId = parseInt(event.target.parentElement.dataset.id);
        todos = todos.filter((todo) => todo.id !== todoId);
        saveTodos();
        renderTodos();
    }
});

// Complete todo
todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-btn")) {
        const todoId = parseInt(event.target.parentElement.dataset.id);
        const todo = todos.find((todo) => todo.id === todoId);
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
});

// Render todos
function renderTodos() {
    todoList.innerHTML = "";
    todos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if (todo.completed) {
            todoItem.classList.add("todo-completed");
        }
        todoItem.dataset.id = todo.id;

        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.textContent = todo.text;
        todoItem.appendChild(todoText);

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        todoItem.appendChild(deleteBtn);

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = todo.completed ? "Undo" : "Complete";
        todoItem.appendChild(completeBtn);

        todoList.appendChild(todoItem);
    });
}

// Save todos to local storage
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}