const addBtn = document.getElementById("addBtn");

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {

    const task = taskInput.value;

    if (task === "") {
        alert("Enter a task");
        return;
    }

    const li = document.createElement("li");

    li.innerText = task;

    taskList.appendChild(li);

    taskInput.value = "";

});
