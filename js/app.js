//Global variables
var addTaskInput = document.getElementById('addTask');
var closeBtn = document.getElementsByClassName('closeBtn');
var taskList = document.getElementById('taskList');

//Functions

//Check if Task list is empty

var hideEmptyTaskList = function () {
    if (taskList.children.length === 0) {
        taskList.style.display = 'none';
    } else {
        taskList.style.display = 'block';
    }
}

//Create elements

var createElements = function (content) {

    var taskContent = document.createElement('div');
    taskContent.className = 'task'
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    var paragraph = document.createElement('p');
    paragraph.className = 'taskParagraph';
    paragraph.innerHTML = content;
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'editInput';
    var image = document.createElement('img');
    image.src = 'img/close.png';
    image.className = 'closeBtn';

    taskContent.appendChild(checkBox);
    taskContent.appendChild(paragraph);
    taskContent.appendChild(input);
    taskContent.appendChild(image);

    return taskContent;
}

//Add task

var addTask = function () {

    if (addTaskInput.value != '') {
        var taskContent = createElements(addTaskInput.value);
        taskList.appendChild(taskContent);
        addTaskInput.value = ''; //Empty the input field
        hideEmptyTaskList();
        saveLocalStorage();
    } //Check if input is not empty
}

//Edit task

var editTask = function (paragraph) {
    var parrent = paragraph.parentElement;
    var input = parrent.querySelector('.editInput');
    var checkbox = parrent.querySelector('input[type="checkbox"]');
    var complete = false;

    if (parrent.classList.contains('complete')) {
        complete = true;
    }
    //Set elements to begining state after editing

    var resetStates = function (complete) {
        paragraph.innerHTML = input.value;
        input.style.display = 'none';
        paragraph.style.display = 'inline-block';
        if (complete) {
            parrent.className = 'task complete';
            console.log('contains');
        } else {
            parrent.className = 'task';
            console.log('contains not');
        }
        checkbox.disabled = false;
    }

    parrent.className = 'task edit';

    input.value = paragraph.innerHTML;
    checkbox.disabled = true;
    paragraph.style.display = 'none';
    input.style.display = 'inline-block';
    input.focus();

    input.addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            resetStates(complete);
            saveLocalStorage();
        }
    }, true);

    document.addEventListener('click', function (event) {
        if (!(event.target === input)) {
            resetStates(complete);
            saveLocalStorage();
        }
    }, true);

}

//Delete task

var deleteTask = function () {
    var parent = this.parentNode;
    parent.parentNode.removeChild(parent);
    hideEmptyTaskList();
    saveLocalStorage();
}

//Save Task list to Local storage
var saveLocalStorage = function () {
    localStorage.taskList = taskList.innerHTML;
}

//Load saved Local Storage

var loadLocalStorage = function () {
    taskList.innerHTML = localStorage.taskList;
}

//Toggle complete incomplete task

var completeTask = function () {
    if (this.checked === true) {
        this.className = 'checked';
        this.parentNode.className += ' complete';
    } else {
        this.parentNode.className = 'task';
        this.className = '';
    }

    saveLocalStorage();

}

//Bind events

var bindEvents = function (listItem) {
    var checkbox = listItem.querySelector('input[type="checkbox"]');

    if (checkbox.classList.contains('checked')) {
        checkbox.checked = true;
    }

    var paragraphEdit = listItem.querySelector('p');
    var deleteBtn = listItem.querySelector('.closeBtn');
    var taskDiv = listItem.querySelector('.task');

    //console.log();

    checkbox.onclick = completeTask;


    paragraphEdit.onclick = function () {
        editTask(paragraphEdit);
    };

    deleteBtn.onclick = deleteTask;
}

addTaskInput.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        addTask();
        loopTaskItems();
    }
}, true);

//Loop trough items
var loopTaskItems = function () {
    for (var i = 0; taskList.children.length > i; i++) {
        bindEvents(taskList.children[i]);

        if (taskList.children[i].classList.contains('edit')) {
            var children = taskList.children[i];
            children = children.querySelector('input[type="checkbox"]');
            children.disabled = true;
        } //If the task is eddited, the checkbox is disabled

    }
};

loadLocalStorage();
loopTaskItems();
hideEmptyTaskList();