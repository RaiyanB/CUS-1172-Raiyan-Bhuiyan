document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");
    let tasks = []; // Array to store tasks

    
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();

        
        const taskTitle = document.getElementById("taskTitle").value.trim();
        const taskPriority = document.getElementById("taskPriority").value;
        const taskStatus = document.querySelector("input[name='taskStatus']:checked").value;

        if (taskTitle === "") {
            alert("Please enter a task title.");
            return;
        }

       
        const task = {
            id: Date.now(),
            title: taskTitle,
            priority: taskPriority,
            status: taskStatus
        };

        
        tasks.push(task);
        renderTasks();

        
        taskForm.reset();
    });

    
    function renderTasks() {
        taskList.innerHTML = ""; 

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = `list-group-item task-item ${task.status === "Completed" ? "task-completed" : ""}`;
            li.innerHTML = `
                <span>${task.title} - <strong>${task.priority}</strong> (${task.status})</span>
                <button class="btn btn-sm btn-success mark-complete" data-id="${task.id}">✔</button>
                <button class="btn btn-sm btn-danger remove-task" data-id="${task.id}">✖</button>
            `;

            taskList.appendChild(li);
        });
    }

  
    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("remove-task")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            tasks = tasks.filter(task => task.id !== taskId);
            renderTasks();
        }

        if (event.target.classList.contains("mark-complete")) {
            const taskId = parseInt(event.target.getAttribute("data-id"));
            tasks = tasks.map(task => {
                if (task.id === taskId) {
                    task.status = "Completed";
                }
                return task;
            });
            renderTasks();
        }
    });
});
