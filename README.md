# My To-Do List Web App

A front-end-only To-Do List application built with Vanilla JavaScript.

## Objective

Build a dynamic To-Do List that allows users to add, complete/uncomplete, and delete tasks with instant UI updates and no page refresh.

## Features

- Add a task from the input field
- Prevent empty or whitespace-only tasks
- Mark tasks as completed and uncompleted
- Delete individual tasks
- Add tasks using the Enter key
- Responsive layout for desktop and mobile

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)

## Project Structure

```text
todo-list-app/
├── index.html
├── style.css
├── script.js
├── README.md
└── screenshots/
```

## How to Run (VS Code + Live Server)

1. Open this project folder in VS Code.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` and choose **Open with Live Server**.
4. The app will open in your browser.

## How the Application Works

1. Type a task in the input field.
2. Click **Add Task** (or press **Enter**) to create a new task item.
3. Use the task checkbox to mark it completed or incomplete.
4. Click **Delete** to remove that specific task.

## JavaScript Concepts Demonstrated

- DOM selection with `getElementById`
- Dynamic element creation with `createElement`
- DOM insertion with `appendChild`
- Event listeners (`click`, `keydown`, `change`)
- Event handling and conditional validation
- CSS class toggling for task completion
- Dynamic UI updates without page reload
- Functions and ES6 syntax

## Testing Performed

Manual checks were performed for:

- Adding a normal task
- Trying to add an empty task
- Adding multiple tasks
- Marking a task as completed
- Marking a task incomplete again
- Deleting a task
- Deleting one task without affecting others
- Adding a task using the Enter key
- Confirming UI updates without page reload
- Checking responsive layout at mobile and desktop widths

## Expected Outcome

Users can manage tasks in a simple, beginner-friendly, front-end-only To-Do List interface with immediate visual feedback.