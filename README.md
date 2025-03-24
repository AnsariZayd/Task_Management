# TaskMaster - Task Management Application

TaskMaster is a simple web-based task management application that helps you organize your tasks with features like adding, editing, deleting, and tracking task completion status.

## Features
- Create tasks with name, description, and due date
- Mark tasks as completed or pending
- Filter tasks by status (All, Pending, Completed)
- Sort tasks by due date (earliest/latest) or name
- Persistent storage using browser's localStorage
- Clean and intuitive user interface

## Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server-side requirements - runs entirely client-side

## Installation
1. Clone or download the repository:
   git clone https://github.com/AnsariZayd/Task_Management.git
2. Ensure you have the following files in your project directory:
   TaskMaster/
├── index.html
├── styles.css
└── script.js

3. No additional dependencies required - all necessary resources are included via CDN (Google Fonts).

## Running the Application
1. Open `index.html` in a web browser:
   - Double-click the file, or
   - Right-click and select "Open with" your preferred browser, or
   - Serve it through a local web server (optional):
## Using Python's simple HTTP server
 - python -m http.server 8000
 - Then navigate to http://localhost:8000

2. The application will load and display any previously saved tasks from localStorage.

## Usage
- **Add Task**: Enter task name, description (optional), and due date (optional), then click "Add Task"
- **Edit Task**: Click "Edit" on any task to modify its details
- **Delete Task**: Click "Delete" to remove a task (with confirmation)
- **Toggle Status**: Click "Complete" or "Undo" to change task status
- **Filter**: Use the status dropdown to show all, pending, or completed tasks
- **Sort**: Use the sort dropdown to order tasks by due date or name

## File Structure
- `index.html`: Main HTML structure and layout
- `styles.css`: Styling for the application
- `script.js`: Application logic and Task/TaskManager classes

## Visit the website on :
