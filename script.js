const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
window.onload = function () {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
};

addBtn.addEventListener("click", function () {
    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    addTask(taskInput.value, false);
    saveTasks();
    taskInput.value = "";
});

function addTask(taskText, completed) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = taskText;

    if (completed) {
        span.style.textDecoration = "line-through";
    }

    span.addEventListener("click", function () {
        span.style.textDecoration =
            span.style.textDecoration === "line-through"
                ? "none"
                : "line-through";
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed:
                li.querySelector("span").style.textDecoration === "line-through"
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}