function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `
        <input type="checkbox" onchange="toggleComplete(this)">

        <span class="task-text">${taskText}</span>

        <div class="actions">
            <button class="edit-btn" onclick="editTask(this)">Edit</button>
            <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
        </div>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.parentElement.remove();
}

function editTask(button) {
    let taskSpan = button.parentElement.previousElementSibling;

    let currentText = taskSpan.innerText;

    let newText = prompt("Edit your task:", currentText);

    if (newText !== null && newText.trim() !== "") {
        taskSpan.innerText = newText;
    }
}

function toggleComplete(checkbox) {
    let taskText = checkbox.nextElementSibling;

    taskText.classList.toggle("completed");
}
