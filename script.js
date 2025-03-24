class Task {
    constructor(id, name, description, dueDate, status = 'pending') {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.renderTasks();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('addTask').addEventListener('click', () => this.addTask());
        document.getElementById('statusFilter').addEventListener('change', (e) => this.renderTasks());
        document.getElementById('sortFilter').addEventListener('change', (e) => this.renderTasks());
        document.getElementById('searchInput').addEventListener('input', (e) => this.renderTasks());
    }

    addTask() {
        const name = document.getElementById('taskName').value.trim();
        const desc = document.getElementById('taskDesc').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;

        if (!name) {
            alert('Task name is required!');
            return;
        }

        const task = new Task(Date.now(), name, desc, dueDate || null);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();

        
        document.getElementById('taskName').value = '';
        document.getElementById('taskDesc').value = '';
        document.getElementById('taskDueDate').value = '';
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        const newName = prompt('Enter new task name:', task.name);
        const newDesc = prompt('Enter new description:', task.description);
        const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate || '');

        if (newName && newName.trim()) {
            task.name = newName.trim();
            task.description = newDesc ? newDesc.trim() : '';
            task.dueDate = newDueDate ? newDueDate : null;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
        }
    }

    toggleStatus(id) {
        const task = this.tasks.find(t => t.id === id);
        task.status = task.status === 'pending' ? 'completed' : 'pending';
        this.saveTasks();
        this.renderTasks();
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        const statusFilter = document.getElementById('statusFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();

        // Filter tasks
        let filteredTasks = this.tasks.filter(task => 
            (statusFilter === 'all' || task.status === statusFilter) &&
            (task.name.toLowerCase().includes(searchQuery) || 
             task.description.toLowerCase().includes(searchQuery))
        );

        // Sort tasks
        filteredTasks.sort((a, b) => {
            if (sortFilter === 'date-asc') {
                return (a.dueDate || '9999-12-31') > (b.dueDate || '9999-12-31') ? 1 : -1;
            } else if (sortFilter === 'date-desc') {
                return (a.dueDate || '0000-01-01') < (b.dueDate || '0000-01-01') ? 1 : -1;
            } else {
                return a.name.localeCompare(b.name);
            }
        });

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

            li.querySelector('.edit-btn').addEventListener('click', () => this.editTask(task.id));
            li.querySelector('.delete-btn').addEventListener('click', () => this.deleteTask(task.id));
            li.querySelector('button:last-child').addEventListener('click', () => this.toggleStatus(task.id));

            taskList.appendChild(li);
        });
    }
}

// Initialize the app
const taskManager = new TaskManager();