const STORAGE_KEY = "daymark-tasks-v1";
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const inputError = document.getElementById("input-error");
const emptyState = document.getElementById("empty-state");
const emptyTitle = document.getElementById("empty-title");
const emptyCopy = document.getElementById("empty-copy");
const clearCompletedButton = document.getElementById("clear-completed");
const progressBar = document.querySelector("[role='progressbar']");
const progressFill = document.getElementById("progress-fill");
const progressMessage = document.getElementById("progress-title");
const filterButtons = [...document.querySelectorAll("[data-filter]")];

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(savedTasks)) return [];
    return savedTasks.filter((task) => (
      task && typeof task.id === "string" && typeof task.text === "string" && typeof task.completed === "boolean"
    ));
  } catch {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    inputError.textContent = "Your browser could not save this change.";
  }
}

function visibleTasks() {
  if (currentFilter === "active") return tasks.filter((task) => !task.completed);
  if (currentFilter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

function createTaskItem(task) {
  const item = document.createElement("li");
  item.className = `task-item${task.completed ? " completed" : ""}`;
  item.dataset.taskId = task.id;

  const checkbox = document.createElement("input");
  checkbox.className = "task-checkbox";
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `${task.completed ? "Mark as not done" : "Mark as done"}: ${task.text}`);

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;

  const removeButton = document.createElement("button");
  removeButton.className = "delete-btn";
  removeButton.type = "button";
  removeButton.innerHTML = "&times;";
  removeButton.setAttribute("aria-label", `Delete task: ${task.text}`);
  removeButton.title = "Delete task";

  item.append(checkbox, text, removeButton);
  return item;
}

function render() {
  const shownTasks = visibleTasks();
  taskList.replaceChildren(...shownTasks.map(createTaskItem));

  const completedCount = tasks.filter((task) => task.completed).length;
  const remainingCount = tasks.length - completedCount;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  document.getElementById("completed-count").textContent = completedCount;
  document.getElementById("total-count").textContent = tasks.length;
  document.getElementById("remaining-count").textContent = `${remainingCount} left`;
  progressFill.style.width = `${progress}%`;
  progressBar.setAttribute("aria-valuemax", String(tasks.length));
  progressBar.setAttribute("aria-valuenow", String(completedCount));
  progressMessage.textContent = tasks.length === 0
    ? "A fresh start."
    : remainingCount === 0
      ? "Look at you go."
      : `${remainingCount} ${remainingCount === 1 ? "step" : "steps"} to go.`;

  clearCompletedButton.disabled = completedCount === 0;
  emptyState.hidden = shownTasks.length > 0;
  if (!tasks.length) {
    emptyTitle.textContent = "Nothing on your list yet";
    emptyCopy.textContent = "Add a task above and give your day a starting point.";
  } else if (!shownTasks.length && currentFilter === "completed") {
    emptyTitle.textContent = "No completed tasks yet";
    emptyCopy.textContent = "Finished tasks will show up here.";
  } else if (!shownTasks.length) {
    emptyTitle.textContent = "All caught up";
    emptyCopy.textContent = "Everything is done. Enjoy the breathing room.";
  }
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    inputError.textContent = "Add a task first, even a small one.";
    taskInput.focus();
    return;
  }

  tasks.unshift({ id: crypto.randomUUID(), text, completed: false });
  currentFilter = "all";
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  taskInput.value = "";
  inputError.textContent = "";
  saveTasks();
  render();
  taskInput.focus();
}

taskForm.addEventListener("submit", addTask);

taskList.addEventListener("change", (event) => {
  if (!event.target.matches(".task-checkbox")) return;
  const task = tasks.find((item) => item.id === event.target.closest(".task-item").dataset.taskId);
  if (!task) return;
  task.completed = event.target.checked;
  saveTasks();
  render();
});

taskList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".delete-btn");
  if (!removeButton) return;
  const item = removeButton.closest(".task-item");
  tasks = tasks.filter((task) => task.id !== item.dataset.taskId);
  saveTasks();
  render();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    render();
  });
});

clearCompletedButton.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  render();
});

const now = new Date();
document.getElementById("today-date").textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  month: "long",
  day: "numeric",
}).format(now);
document.getElementById("stamp-day").textContent = now.getDate();
document.getElementById("stamp-month").textContent = new Intl.DateTimeFormat(undefined, { month: "short" }).format(now);

render();
