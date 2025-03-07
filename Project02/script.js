document.addEventListener("DOMContentLoaded", function() {
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  let tasks = [];
  
  taskForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value.trim();
    const priority = document.getElementById("taskPriority").value;
    const status = document.querySelector("input[name='taskStatus']:checked").value;
    if (!title) return;
    const task = { id: Date.now(), title, priority, status };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
  });
  
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.className = "list-group-item task-item " + (task.status === "Completed" ? "task-completed" : "");
      li.innerHTML = `<span>${task.title} - <strong>${task.priority}</strong> (${task.status})</span>
        <div>
          <button class="btn btn-success btn-sm mark-complete" data-id="${task.id}">✔</button>
          <button class="btn btn-danger btn-sm remove-task" data-id="${task.id}">✖</button>
        </div>`;
      taskList.appendChild(li);
    });
  }
  
  taskList.addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-task")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      tasks = tasks.filter(t => t.id !== id);
      renderTasks();
    }
    if (e.target.classList.contains("mark-complete")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      tasks = tasks.map(t => {
        if (t.id === id) t.status = "Completed";
        return t;
      });
      renderTasks();
    }
  });
});
