const taskInput = document.getElementById("task-input");

const category = document.getElementById("category");

const taskTime = document.getElementById("task-time");

const taskList = document.getElementById("task-list");

function addTask(){

    if(taskInput.value === ""){

        alert("Please enter a task");

        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `

        <div class="task-top">

            <div class="task-name">
                ${taskInput.value}
            </div>

            <i class="fa-solid fa-ellipsis"></i>

        </div>

        <div class="task-info">
            Today • ${taskTime.value || "No Time"}
        </div>

        <div class="task-category">
            ${category.value}
        </div>

        <div class="actions">

            <button class="complete-btn">
                Complete
            </button>

            <button class="delete-btn">
                Delete
            </button>

        </div>

    `;

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounts();

    saveData();
}

/* COMPLETE + DELETE */

taskList.addEventListener("click", function(e){

    if(e.target.classList.contains("complete-btn")){

        e.target.parentElement.parentElement.classList.toggle("checked");

        updateCounts();

        saveData();
    }

    if(e.target.classList.contains("delete-btn")){

        e.target.parentElement.parentElement.remove();

        updateCounts();

        saveData();
    }

});

/* COUNTS */

function updateCounts(){

    const allTasks = document.querySelectorAll("#task-list li").length;

    const completedTasks = document.querySelectorAll(".checked").length;

    document.getElementById("all-count").innerHTML = allTasks;

    document.getElementById("completed-count").innerHTML = completedTasks;

    document.getElementById("pending-count").innerHTML =
        allTasks - completedTasks;

    document.getElementById("today-count").innerHTML = allTasks;
}

/* SAVE */

function saveData(){

    localStorage.setItem("tasks", taskList.innerHTML);
}

/* SHOW */

function showTasks(){

    taskList.innerHTML = localStorage.getItem("tasks");

    updateCounts();
}

showTasks();
