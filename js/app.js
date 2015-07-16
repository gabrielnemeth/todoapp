/*jshint onevar: true */
/*jslint devel:true */

(function () {
    'use strict';
    var input = document.getElementById('addTask'),
        taskList = document.getElementById('taskList'),
        closeBtn = document.getElementsByClassName('closeBtn'),
        editInput = document.getElementsByClassName('edit'),
        taskItem;

    for (var i = 0; i < editInput.length; i++) {
        editInput[i].style.display = 'none';
    }


    document.addEventListener("keydown", function (event) {
        if (event.keyCode === 13) {
            taskItem = input.value;
            if (taskItem !== '') {
                taskList.innerHTML += '<div class="task"><p class="taskParagraph"><input type="text" class="edit" value="" style="display: none;"/>' + taskItem + '</p><img src="img/close.png" class="closeBtn" /></div>';
            }
            input.value = '';
        }
    }, true);

    document.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;
        
        if (target.className === 'closeBtn') {
            var paragraph = target.parentNode;
            paragraph.parentNode.removeChild(paragraph);
        }
        
        if (target.className === 'taskParagraph') {
            var inputField = target.parentNode;
            console.log(inputField);
        }        
        
    }, false);


}());