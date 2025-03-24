// Task class to represent individual tasks
class Task {
    constructor(id, name, description, dueDate, status = 'pending') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

// TaskManager class to handle all task-related operations
class TaskManager {
    constructor() {
        // Load tasks from local storage or initialize empty array
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    // Initialize the application
    init() {
        // Set the minimum date for the due date input to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('taskDueDate').setAttribute('min', today);

        this.renderTasks();
        this.setupEventListeners();
    }

    // Set up event listeners for user interactions
    setupEventListeners() {
        document.getElementById('addTask').addEventListener('click', () => this.addTask());
        document.getElementById('statusFilter').addEventListener('change', () => this.renderTasks());
        document.getElementById('sortFilter').addEventListener('change', () => this.renderTasks());
    }

    // Add a new task
    addTask() {
        const name = document.getElementById('taskName').value.trim();
        const desc = document.getElementById('taskDesc').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;

        // Validate task name
        if (!name) {
            alert('Task name is required!');
            return;
        }

        // Create and add new task
        const task = new Task(Date.now(), name, desc, dueDate || null);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        // Clear input fields
        document.getElementById('taskName').value = '';
        document.getElementById('taskDesc').value = '';
        document.getElementById('taskDueDate').value = '';
    }

    // Edit an existing task
    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        const newName = prompt('Enter new task name:', task.name);
        const newDesc = prompt('Enter new description:', task.description);
        const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate || '');

        // Update task if new name is provided and valid
        if (newName && newName.trim()) {
            task.name = newName.trim();
            task.description = newDesc ? newDesc.trim() : '';
            task.dueDate = newDueDate ? newDueDate : null;

            // Validate that the new due date is not in the past
            if (task.dueDate) {
                const today = new Date().toISOString().split('T')[0];
                if (task.dueDate < today) {
                    alert('Due date cannot be in the past! Please select a current or future date.');
                    return;
                }
            }

            this.saveTasks();
            this.renderTasks();
        }
    }

    // Delete a task with confirmation
    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
        }
    }

    // Toggle task status between pending and completed
    toggleStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        this.saveTasks();
        this.renderTasks();
    }

    // Save tasks to local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Render tasks to the DOM
    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        const statusFilter = document.getElementById('statusFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;

        // Filter tasks by status
        let filteredTasks = this.tasks.filter(task => 
            statusFilter === 'all' || task.status === statusFilter
        );

        // Sort tasks based on selected criteria
        filteredTasks.sort((a, b) => {
            if (sortFilter === 'date-asc') {
                return (a.dueDate || '9999-12-31') > (b.dueDate || '9999-12-31') ? 1 : -1;
            } else if (sortFilter === 'date-desc') {
                return (a.dueDate || '0000-01-01') < (b.dueDate || '0000-01-01') ? 1 : -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });

        // Create and append task items
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.status}`;
            li.innerHTML = `
                <h3>${task.name}</h3>
                <p>${task.description}</p>
                ${task.dueDate ? `<div class="task-due-date">Due: ${new Date(task.dueDate).toLocaleDateString()}</div>` : ''}
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <button>${task.status === 'pending' ? 'Complete' : 'Undo'}</button>
                </div>
            `;

            // Add event listeners to task action buttons
            li.querySelector('.edit-btn').addEventListener('click', () => this.editTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));
            li.querySelector('button:last-child').addEventListener('click', () => this.toggleStatus(task.id));

            taskList.appendChild(li);
        });
    }
}

// Initialize the TaskManager
const taskManager = new TaskManager();
