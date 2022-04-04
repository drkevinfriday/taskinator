
    var buttonEL = document.querySelector("#save-task");
    var taskToDoEL = document.querySelector("#task-to-do");

 var createTaskHandler = function(){
    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "Fuck this";
    taskToDoEL.appendChild(listItemEL);
 }

 buttonEL.addEventListener("click", createTaskHandler);