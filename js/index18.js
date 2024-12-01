let input = document.querySelector('input');
let add = document.querySelector('#add-task');
let list = document.querySelector('#task-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.selected); // Pass selected state
    });
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, isSelected) {
    let element = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = `<i class="fa-solid fa-xmark" style="cursor:pointer;"></i>`;
    
    element.innerText = taskText; // Set the inner text to the task string
    if (isSelected) {
        element.classList.add('selected'); // Add selected class if applicable
    }
    
    element.append(span);
    list.append(element);
}

// Add event listener for adding tasks
add.addEventListener('click', () => {
    if (input.value.trim() !== '') { // Check for non-empty input
        let taskText = input.value; // Store the task text
        
        addTaskToDOM(taskText, false); // Add the task to the DOM without selection
        
        // Save the new task to local storage
        saveTaskToLocalStorage(taskText, false); // Save as unselected
        
        input.value = ''; // Clear input after adding
    }
});

// Function to save a task to local storage
function saveTaskToLocalStorage(task, isSelected) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, selected: isSelected }); // Store as an object with selected state
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save back to local storage
}

// Event listener for deleting tasks and toggling selection
list.addEventListener('click', (e) => {
    console.log(e.target.tagName);
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('selected');
        updateTaskSelectionInLocalStorage(e.target.innerText.trim(), e.target.classList.contains('selected'));
    } else if (e.target.tagName === 'I') {
        console.log('object');

        // Remove the task from local storage before removing it from DOM
        removeTaskFromLocalStorage(e.target.parentElement.parentElement.innerText.trim());
        
        e.target.parentElement.parentElement.remove(); // Remove from DOM
    }
});

// Function to update task selection state in local storage
function updateTaskSelectionInLocalStorage(taskText, isSelected) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => 
        task.text === taskText ? { ...task, selected: isSelected } : task
    ); // Update selected state for the specific task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated array back to local storage
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText); // Filter out the deleted task string
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated array back to local storage
}