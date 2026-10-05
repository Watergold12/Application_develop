// =========================
// Mission Control
// Task Management Application
// =========================


// =========================
// DOM Elements
// =========================

const form =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const categoryInput =
    document.getElementById("categoryInput");

const priorityInput =
    document.getElementById("priorityInput");

const taskList =
    document.getElementById("taskList");

const formError =
    document.getElementById("formError");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter");


// Statistics

const totalCount =
    document.getElementById("totalCount");

const activeCount =
    document.getElementById("activeCount");

const completedCount =
    document.getElementById("completedCount");

const progressValue =
    document.getElementById("progressValue");

const progressFill =
    document.getElementById("progressFill");

const progressText =
    document.getElementById("progressText");


// =========================
// Application State
// =========================

const STORAGE_KEY =
    "mcrae.missionControl.tasks";


let tasks = loadTasks();

let currentFilter = "all";

let searchTerm = "";


// =========================
// Display Current Date
// =========================

document.getElementById("today").textContent =
    new Date().toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


// =========================
// Local Storage
// =========================

function loadTasks() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        return saved
            ? JSON.parse(saved)
            : [];

    } catch {

        return [];

    }
}


function saveTasks() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}


// =========================
// Create Task
// =========================

function addTask(
    title,
    category,
    priority
) {

    const newTask = {

        id:
            Date.now().toString(36)
            +
            Math.random()
                .toString(36)
                .slice(2, 7),

        title: title,

        category: category,

        priority: priority,

        completed: false,

        createdAt:
            new Date().toISOString()

    };


    tasks.unshift(newTask);

    saveTasks();

    render();

}


// =========================
// Toggle Task
// =========================

function toggleTask(id) {

    const task =
        tasks.find(
            (item) => item.id === id
        );


    if (!task) {

        return;

    }


    task.completed =
        !task.completed;


    saveTasks();

    render();

}


// =========================
// Delete Task
// =========================

function deleteTask(id) {

    tasks =
        tasks.filter(
            (task) => task.id !== id
        );


    saveTasks();

    render();

}


// =========================
// Clear Completed
// =========================

function clearCompleted() {

    tasks =
        tasks.filter(
            (task) => !task.completed
        );


    saveTasks();

    render();

}


// =========================
// Get Visible Tasks
// =========================

function getVisibleTasks() {

    return tasks.filter((task) => {


        // Filter by status

        if (
            currentFilter === "active"
            &&
            task.completed
        ) {

            return false;

        }


        if (
            currentFilter === "completed"
            &&
            !task.completed
        ) {

            return false;

        }


        // Search filter

        if (searchTerm) {

            const searchableText =
                (
                    task.title
                    + " "
                    + task.category
                    + " "
                    + task.priority
                ).toLowerCase();


            if (
                !searchableText.includes(
                    searchTerm.toLowerCase()
                )
            ) {

                return false;

            }

        }


        return true;

    });

}


// =========================
// Render Application
// =========================

function render() {

    const visibleTasks =
        getVisibleTasks();


    taskList.innerHTML = "";


    visibleTasks.forEach(
        (task) => {

            const item =
                createTaskElement(task);


            taskList.appendChild(item);

        }
    );


    updateStatistics();


    emptyState.style.display =
        visibleTasks.length === 0
            ? "block"
            : "none";

}


// =========================
// Create Task HTML
// =========================

function createTaskElement(task) {

    const li =
        document.createElement("li");


    li.className =
        "task priority-" +
        task.priority;


    if (task.completed) {

        li.classList.add("completed");

    }


    li.dataset.id =
        task.id;


    const checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
        "task-check";

    checkbox.checked =
        task.completed;


    const content =
        document.createElement("div");


    const title =
        document.createElement("div");

    title.className =
        "task-title";

    title.textContent =
        task.title;


    const meta =
        document.createElement("div");

    meta.className =
        "task-meta";


    const category =
        document.createElement("span");

    category.className =
        "badge";

    category.textContent =
        task.category;


    const priority =
        document.createElement("span");

    priority.className =
        "badge priority-" +
        task.priority;

    priority.textContent =
        task.priority.toUpperCase();


    const date =
        document.createElement("span");

    date.textContent =
        formatDate(task.createdAt);


    meta.appendChild(category);

    meta.appendChild(priority);

    meta.appendChild(date);


    content.appendChild(title);

    content.appendChild(meta);


    const deleteButton =
        document.createElement("button");

    deleteButton.className =
        "delete-button";

    deleteButton.textContent =
        "×";

    deleteButton.title =
        "Delete task";


    li.appendChild(checkbox);

    li.appendChild(content);

    li.appendChild(deleteButton);


    return li;

}


// =========================
// Format Date
// =========================

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short"
            }
        );

}


// =========================
// Update Statistics
// =========================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            (task) => task.completed
        ).length;


    const active =
        total - completed;


    const progress =
        total === 0
            ? 0
            : Math.round(
                (completed / total) * 100
            );


    totalCount.textContent =
        total;


    activeCount.textContent =
        active;


    completedCount.textContent =
        completed;


    progressValue.textContent =
        progress + "%";


    progressText.textContent =
        `${completed} / ${total} tasks`;


    progressFill.style.width =
        progress + "%";

}


// =========================
// Add Task
// =========================

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const title =
            taskInput.value.trim();


        const category =
            categoryInput.value;


        const priority =
            priorityInput.value;


        // Empty task

        if (!title) {

            formError.textContent =
                "Enter a task before adding it.";

            taskInput.focus();

            return;

        }


        // Duplicate active task

        const duplicate =
            tasks.some(
                (task) =>
                    !task.completed &&
                    task.title.toLowerCase()
                    === title.toLowerCase()
            );


        if (duplicate) {

            formError.textContent =
                "This active task already exists.";

            taskInput.focus();

            return;

        }


        formError.textContent = "";


        addTask(
            title,
            category,
            priority
        );


        form.reset();


        // Restore default priority

        priorityInput.value =
            "medium";


        taskInput.focus();

    }
);


// =========================
// Task Actions
// Event Delegation
// =========================

taskList.addEventListener(
    "click",
    (event) => {

        const taskElement =
            event.target.closest(".task");


        if (!taskElement) {

            return;

        }


        const id =
            taskElement.dataset.id;


        // Delete button

        if (
            event.target.closest(
                ".delete-button"
            )
        ) {

            deleteTask(id);

            return;

        }


        // Checkbox or task content

        if (
            event.target.closest(
                ".task-check"
            )
            ||
            event.target.closest(
                ".task-title"
            )
        ) {

            toggleTask(id);

        }

    }
);


// =========================
// Filters
// =========================

filterButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                filterButtons
                    .forEach(
                        (item) =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                render();

            }
        );

    }
);


// =========================
// Search
// =========================

searchInput.addEventListener(
    "input",
    () => {

        searchTerm =
            searchInput.value.trim();


        render();

    }
);


// =========================
// Clear Completed
// =========================

document
    .getElementById("clearCompleted")
    .addEventListener(
        "click",
        clearCompleted
    );


// =========================
// Initial Render
// =========================

render();