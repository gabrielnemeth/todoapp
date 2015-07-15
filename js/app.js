/*jshint onevar: true */
/*jslint devel:true */

(function () {
    'use strict';
    var input = document.getElementById('addTask'),
        taskList = document.getElementById('taskList'),
        closeBtn = document.getElementsByClassName('closeBtn'),
        taskItem;

    taskList.style.visibility = 'hidden';

    window.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            taskItem = input.value;
            if (taskItem !== '') {
                taskList.style.visibility = 'visible';
                taskList.innerHTML += '<p>' + taskItem + '<img src="img/close.png" class="closeBtn" /></p>';
                closeBtn = document.getElementsByClassName('closeBtn');
                console.log(closeBtn);
            }
        }
    }, true);
    
    closeBtn.onclick = function () {
        console.log('Close');
        console.log(closeBtn);
    };

}());