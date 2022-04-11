
   //  var buttonEL = document.querySelector("#save-task");
    var formEL = document.querySelector('#task-form')
    var taskToDoEL = document.querySelector("#task-to-do");
   //add
   var createTaskHandler = function(event){

    event.preventDefault();
   // saves the task input name as a variable
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // saves the task type from the drop down menuname as a variable
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    console.log(taskNameInput);
    console.log(taskTypeInput);
  
   //creates a list element to save the new task item in 
    var listItemEL = document.createElement("li");
    // sets the class name for the new li
    listItemEL.className = "task-item";

    //creates a new div to hold the task info and a place to add the list item
    var taskInfoEL = document.createElement("div")
   // give the new div a clas
   taskInfoEL.className = "task-info";
   
   // add  HTML content to div
   taskInfoEL.innerHTML = "<h3 class= 'task-name'>" +taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
   
   console.log(taskInfoEL.innerHTML)
//sets the task name and type as the  as a DOM List element
   listItemEL.appendChild(taskInfoEL)

    
    
   //  append the new li item to the Task to do DOM 
    taskToDoEL.appendChild(listItemEL);
 }

//  buttonEL.addEventListener("click", createTaskHandler);
formEL.addEventListener("submit", createTaskHandler);