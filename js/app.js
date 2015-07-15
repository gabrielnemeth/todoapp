var input = document.getElementById('addTask');
var taskList = document.getElementById('taskList');
var taskItem;

taskList.style.visibility = 'hidden';

window.addEventListener("keydown", function (event) {
    if (event.keyCode == 13) {
        taskItem = input.value;
        if (taskItem !== '') {
            taskList.style.visibility = 'visible';
            taskList.innerHTML += '<p>' + taskItem + '</p>';
            
            
        }
    }
}, true);