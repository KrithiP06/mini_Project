const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="task-left">
            <input type="checkbox">
            <span>${taskText}</span>
        </div>

        <button class="delete-btn">Delete</button>
    `;

    const checkbox = li.querySelector("input");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed");
    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
    });

    taskList.appendChild(li);

    taskInput.value = "";
}
