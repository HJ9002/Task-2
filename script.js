const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
const inputError = document.getElementById("input-error");

function createTaskItem(taskText) {
  const listItem = document.createElement("li");
  listItem.className = "task-item";

  const taskContent = document.createElement("div");
  taskContent.className = "task-content";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.className = "task-toggle";
  toggle.setAttribute("aria-label", `Mark task "${taskText}" as completed`);

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = taskText;

  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.className = "delete-btn";
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("aria-label", `Delete task "${taskText}"`);

  toggle.addEventListener("change", () => {
    listItem.classList.toggle("completed", toggle.checked);
  });

  deleteButton.addEventListener("click", () => {
    listItem.remove();
  });

  taskContent.appendChild(toggle);
  taskContent.appendChild(text);

  listItem.appendChild(taskContent);
  listItem.appendChild(deleteButton);

  return listItem;
}

function addTask() {
  const rawValue = taskInput.value.trim();

  if (!rawValue) {
    inputError.textContent = "Please enter a task before adding.";
    taskInput.focus();
    return;
  }

  const taskItem = createTaskItem(rawValue);
  taskList.appendChild(taskItem);

  taskInput.value = "";
  inputError.textContent = "";
  taskInput.focus();
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});
