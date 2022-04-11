
  // create a task counter for the task id attribute
var taskIdCouter = 0
  
  
  //  var buttonEL = document.querySelector("#save-task");
var formEL = document.querySelector('#task-form')
var taskToDoEL = document.querySelector("#task-to-do");


// turns the user input into a object then calls the  create task function
var taskFormHandler = function(event){
   // check if input values are empty strings


   event.preventDefault();
// saves the task input name as a variable
   var taskNameInput = document.querySelector("input[name='task-name']").value;
   // saves the task type from the drop down menuname as a variable
   var taskTypeInput = document.querySelector("select[name='task-type']").value;

// package up data as an object
if (!taskNameInput || !taskTypeInput) {
   alert("You need to fill out the task form!");
   return false;
   }
var taskDataObj ={
   name: taskNameInput,
   type: taskTypeInput
}

// send the task data to the create task function
createTaskEL(taskDataObj);
formEL.reset();


}

var createTaskEL = function(taskDataObj){


//creates a list element to save the new task item in 
var listItemEL = document.createElement("li");

// sets the class name for the new li
listItemEL.className = "task-item";

//add task id to custom attribute
listItemEL.setAttribute("data-task-id", taskIdCouter)

//creates a new div to hold the task info and a place to add the list item
var taskInfoEL = document.createElement("div")
// give the new div a clas
taskInfoEL.className = "task-info";

// add  HTML content to div
taskInfoEL.innerHTML = "<h3 class= 'task-name'>" +taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

console.log(taskInfoEL.innerHTML)
//sets the task name and type as the  as a DOM List element
listItemEL.appendChild(taskInfoEL)

var taskActionsEL = createTaskActions(taskIdCouter);

console.log(taskActionsEL)
listItemEL.appendChild(taskActionsEL);

//  append the new li item to the Task to do DOM 
taskToDoEL.appendChild(listItemEL);

// increase the task counter by one every time a tas in created 
taskIdCouter++;
}

var createTaskActions = function(taskId){
// creates a  div for the action container on each task
   var actionContainerEl = document.createElement("div");
   // set the class name for the task actions div
   actionContainerEl.className = "task-actions"

   // create edit button on task action div
   var editButtonEL = document.createElement("button");
   editButtonEL.textContent = "Edit";
   editButtonEL.className ="btn edit-btn";
   //sets the data atttibute to  the taskId passed in as a parameter
   editButtonEL.setAttribute ("data-task-id", taskId)

   //append the edit btn to the the div
   actionContainerEl.appendChild(editButtonEL);

    // create edit button on task action div
    var deleteButtonEL = document.createElement("button");
    deleteButtonEL.textContent = "Delete";
    deleteButtonEL.className ="btn delete-btn";
    //sets the data atttibute to  the taskId passed in as a parameter
    deleteButtonEL.setAttribute ("data-task-id", taskId)

       //append delete the btn to the the div
   actionContainerEl.appendChild(deleteButtonEL);

   //create the todo drop down menu 
   var statusSelectEL = document.createElement("select");
   statusSelectEL.className ="select-status";
   statusSelectEL.setAttribute("name","status-change");
   statusSelectEL.setAttribute("data-task-id", taskId);

   actionContainerEl.appendChild(statusSelectEL);

   var statusChoices = ["To-Do", "In Progress", "Completed"]

   for(var i = 0; i < statusChoices.length; i++){
      //create a option element
      var statusOptionEL = document.createElement("option");
      statusOptionEL.textContent = statusChoices[i];
      statusOptionEL.setAttribute("value", statusChoices[i]);


      //append to select
      statusSelectEL.appendChild(statusOptionEL);
   }

   return actionContainerEl;


}

//  buttonEL.addEventListener("click", taskFormHandler);
formEL.addEventListener("submit", taskFormHandler);