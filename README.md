# Daymark To-Do List

Daymark is a responsive, front-end-only task list built with HTML, CSS, and vanilla JavaScript. It gives tasks a calm home, tracks daily progress, and saves your list in the browser.

## Features

- Add tasks with the button or Enter; blank tasks are rejected.
- Mark tasks complete or active, delete individual tasks, and clear completed tasks.
- Filter the list by all, to-do, or done.
- See remaining-task and completion progress counts.
- Keep tasks after refreshing with browser `localStorage`.
- Use the responsive layout and keyboard-accessible controls on mobile or desktop.

## Files

- `index.html` — semantic page structure
- `style.css` — responsive layout, visual styles, and motion preferences
- `script.js` — task state, rendering, events, and local storage
- `README.md` — project and run instructions

## Run locally

1. Open this folder in VS Code.
2. Install the Live Server extension if it is not already installed.
3. Right-click `index.html` and choose **Open with Live Server**.

Tasks are saved only in the current browser on this device. Clearing browser site data will remove them.

## Concepts used

DOM manipulation, event listeners, event delegation, arrays, template strings, form validation, accessible labels, and browser `localStorage`.