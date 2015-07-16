/*jshint onevar: true */
/*jslint devel:true */

(function () {
    'use strict';
    var input = document.getElementById('addTask'),
        taskList = document.getElementById('taskList'),
        closeBtn = document.getElementsByClassName('closeBtn'),
        editInput = document.getElementsByClassName('edit'),
        taskItem;

    var hideTaskList = function () {
        taskList.style.visibility = 'hidden';
    }; //Hide TaskList div

    var showTaskList = function () {

        taskList.style.visibility = 'visible';
    }; //Show TaskList div

    for (var i = 0; i < editInput.length; i++) {
        editInput[i].style.display = 'none';
    }

    if (taskList.children.length === 0) {
        hideTaskList();
    } //Disable input for editing Tasks by default

    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {

            taskItem = input.value;
            if (taskItem !== '') {
                taskList.innerHTML += '<div class="task"><p class="taskParagraph"><input type="text" class="edit" value="" style="display: none;"/>' + taskItem + '</p><img src="img/close.png" class="closeBtn" /></div>';
            } //If input field isn't empty, add value of the input to a TaskList

            input.value = ''; //After pressing enter, remove the value from input

            if (taskList.children.length > 0) {
                showTaskList();
            } //If the Task list is hidden, then add visibility
        }
    }, true);

    document.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;


        if (target.className === 'closeBtn') {
            var paragraph = target.parentNode;
            paragraph.parentNode.removeChild(paragraph);
        } //After clicking on close icon, the Task is removed from Task List entirelly

        if (taskList.children.length === 0) {
            hideTaskList();
        } //Hide Task List if there aren't tasks

        if (target.className === 'taskParagraph') {
            var inputField = target.parentNode;
        } //TODO: after clicking on paragraph change p into input tag

    }, false);


}());