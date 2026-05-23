/* script.js */

const taskInput = document.getElementById("task-input");

const category = document.getElementById("category");

const taskDate = document.getElementById("task-date");

const taskTime = document.getElementById("task-time");

const taskList = document.getElementById("task-list");

const searchInput = document.getElementById("search-input");

const themeBtn = document.getElementById("theme-btn");

let currentFilter = "all";

function addTask(){

    if(taskInput.value.trim() === ""){

        alert("Please enter a task");

        return;
    }

    let li = document.createElement("li");

    li.innerHTML = `

        <div class="task-header">

            <div class="task-name">
                ${taskInput.value}
            </div>

            <i class="fa-solid fa-ellipsis"></i>

        </div>

        <div class="task-details">

            📅 ${taskDate.value || "No Date"}

            &nbsp;&nbsp;

            ⏰ ${taskTime.value || "No Time"}

        </div>

        <div class="badge">

            ${category.value}

        </div>

        <div class="task-actions">

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
    taskDate.value = "";
    taskTime.value = "";

    saveTasks();

    updateDashboard();
}

taskList.addEventListener("click", function(e){

    const task = e.target.closest("li");

    if(e.target.classList.contains("complete-btn")){

        task.classList.toggle("checked");

        saveTasks();

        updateDashboard();

        filterTasks();
    }

    if(e.target.classList.contains("delete-btn")){

        task.style.opacity = "0";

        task.style.transform = "translateX(40px)";

        setTimeout(()=>{

            task.remove();

            saveTasks();

            updateDashboard();

        },300);
    }

});

function updateDashboard(){

    const allTasks =
    document.querySelectorAll("#task-list li");

    const completedTasks =
    document.querySelectorAll(".checked");

    document.getElementById("all-count").innerHTML =
    allTasks.length;

    document.getElementById("completed-count").innerHTML =
    completedTasks.length;

    document.getElementById("pending-count").innerHTML =
    allTasks.length - completedTasks.length;

    let progress = 0;

    if(allTasks.length > 0){

        progress =
        Math.round((completedTasks.length / allTasks.length) * 100);
    }

    document.getElementById("progress").innerHTML =
    progress + "%";
}

function saveTasks(){

    localStorage.setItem("advancedTasks", taskList.innerHTML);
}

function showTasks(){

    taskList.innerHTML =
    localStorage.getItem("advancedTasks") || "";

    updateDashboard();
}

/* SEARCH */

searchInput.addEventListener("keyup", ()=>{

    let value =
    searchInput.value.toLowerCase();

    document.querySelectorAll("#task-list li")
    .forEach(task=>{

        let text =
        task.innerText.toLowerCase();

        task.style.display =
        text.includes(value) ? "block" : "none";
    });
});

/* FILTERS */

document.querySelectorAll(".filter-btn")
.forEach(btn=>{

    btn.addEventListener("click", ()=>{

        document.querySelectorAll(".filter-btn")
        .forEach(b=>{

            b.classList.remove("active");
        });

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        filterTasks();
    });
});

function filterTasks(){

    document.querySelectorAll("#task-list li")
    .forEach(task=>{

        switch(currentFilter){

            case "completed":

                task.style.display =
                task.classList.contains("checked")
                ? "block"
                : "none";

                break;

            case "pending":

                task.style.display =
                !task.classList.contains("checked")
                ? "block"
                : "none";

                break;

            default:

                task.style.display = "block";
        }
    });
}

/* DARK MODE */

themeBtn.addEventListener("click", ()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme","dark");
    }

    else{

        localStorage.setItem("theme","light");
    }
});

function loadTheme(){

    const theme =
    localStorage.getItem("theme");

    if(theme === "dark"){

        document.body.classList.add("dark");
    }
}

showTasks();

loadTheme();
