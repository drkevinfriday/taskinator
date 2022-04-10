
   //  var buttonEL = document.querySelector("#save-task");
    var formEL = document.querySelector('#task-form')
    var taskToDoEL = document.querySelector("#task-to-do");
   //add
   var createTaskHandler = function(event){

   //  event.preventDefault();

    var listItemEL = document.createElement("li");
    listItemEL.className = "task-item";
    listItemEL.textContent = "Fuck this";
    taskToDoEL.appendChild(listItemEL);
 }

//  buttonEL.addEventListener("click", createTaskHandler);
formEL.addEventListener("submit", createTaskHandler);