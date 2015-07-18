//Global variables
var addTaskInput = document.getElementById('addTask');
var closeBtn = document.getElementsByClassName('closeBtn');
var taskList = document.getElementById('taskList');

//Functions

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
    } //Check if input is not empty
}

//Edit task

var editTask = function (paragraph) {
    var parrent = paragraph.parentElement;
    var input = parrent.querySelector('.editInput');
    var checkbox = parrent.querySelector('input[type="checkbox"]');

    //Set elements to begining state after editing

    var resetStates = function () {
        paragraph.innerHTML = input.value;
        input.style.display = 'none';
        paragraph.style.display = 'inline-block';
        parrent.className = 'task';
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
            resetStates();
        }
    }, true);

    document.addEventListener('click', function (event) {
        if (!(event.target === input)) {
            resetStates();
        }
    }, true);

}

//Delete task

var deleteTask = function () {
    var parent = this.parentNode;
    parent.parentNode.removeChild(parent);
}

//Toggle complete incomplete task

var completeTask = function () {
    if (this.checked === true) {
        this.parentNode.className += ' complete';
    } else {
        this.parentNode.className = 'task';
    }
}

//Bind events

var bindEvents = function (listItem) {
    var checkbox = listItem.querySelector('input[type="checkbox"]');
    var paragraphEdit = listItem.querySelector('p');
    var deleteBtn = listItem.querySelector('.closeBtn');
    var taskDiv = listItem.querySelector('.task');

    //console.log();

    checkbox.onclick = completeTask;

    if (!(listItem.classList.contains('complete'))) {
        paragraphEdit.onclick = function () {
            editTask(paragraphEdit);
        };
    }

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

loopTaskItems();