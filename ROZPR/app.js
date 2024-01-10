document.addEventListener("DOMContentLoaded", function() {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            completed: false,
            date: new Date().toISOString()
        };

        saveTask(task);
        loadTasks();
        taskInput.value = "";
    }
}

function saveTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    const tasks = getTasksFromLocalStorage();

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleTaskCompletion('${task.date}')">Toggle completion</button>
            <button onclick="editTask('${task.date}')">Edit</button>
            <button onclick="deleteTask('${task.date}')">Delete</button>
        `;

        taskList.appendChild(taskElement);
    });
}

function toggleTaskCompletion(taskDate) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.date === taskDate);

    if (taskIndex !== -1) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function editTask(taskDate) {
    let tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.date === taskDate);

    if (taskIndex !== -1) {
        const updatedText = prompt("Edit task:", tasks[taskIndex].text);
        if (updatedText !== null) {
            tasks[taskIndex].text = updatedText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        }
    }
}

function deleteTask(taskDate) {
    let tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.date !== taskDate);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    loadTasks();
}