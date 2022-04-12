
  // create a task counter for the task id attribute
var taskIdCouter = 0
  
  
  //  var buttonEL = document.querySelector("#save-task");
var formEL = document.querySelector('#task-form')

// task status div containers
var tasksToDoEL = document.querySelector("#task-to-do");
var tasksInProgressEl= document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var pageContentEL = document.querySelector("#page-content");



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

//checks to see if the task is editted
var isEdit = formEL.querySelector("data-task-id");
console.log("Is this task editted" + isEdit);

//has data attribute, so get task id and call function to complete edit process
   if(isEdit){

      var taskId =formEL.getAttribute("data-task-id");
      // Run complete function if task is being
      completeEditTask(taskNameInput, taskTypeInput, taskId) 

   }
   else{
      // sets the taskobject
      var taskDataObj ={
         name: taskNameInput,
         type: taskTypeInput
      };    

      // send the task data to the create task function
      createTaskEL(taskDataObj);
      formEL.reset();

   }
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
tasksToDoEL.appendChild(listItemEL);

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

var completeEditTask = function(taskName,taskType,taskId){
   console.log(taskName,taskType,taskId);

   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   // set new values
   taskSelected.querySelector("h3.task-name").textContent = taskName;
   taskSelected.querySelector("span.task-type").textContent = taskType;

   alert("Task Updated!");
   formEl.removeAttribute("data-task-id");
   document.querySelector("#save-task").textContent = "Add Task";
};

var taskButtonHandler = function(event){


   var targetEl = event.target;
   
   //this show the delete task being created
   console.log("This is the event created when clicking" + event.target);

   // if the edit button is clicked
   if (targetEl.matches(".edit-btn")) {

      // get the element's task id
      var taskId = targetEl.getAttribute("data-task-id");

      // this shows the task id 
      console.log("This is the task id " + taskId);

      // this calls the edit function task button by taskId
      editTask(taskId);
      }

      // if delete button was clicked
   else if (targetEl.matches(".delete-btn")) {

      // get the element's task id
      var taskId = targetEl.getAttribute("data-task-id");

      // this shows the task id 
      console.log("This is the task id " + taskId);

      // this calls the delete task button by taskId
      deleteTask(taskId);
      }

};



var taskStatusChangeHandler = function(event){

   // get the task item's id 
   var taskId = event.target.getAttribute("data-task-id");

   // find the parent task item element based on the id
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

   // get the current option and convert it to lowercase

   var statusValue = event.target.value.toLowerCase();


   console.log(statusValue)

   if (statusValue === "to do") {
     tasksToDoEL.appendChild(taskSelected);
    } 
    else if (statusValue === "in progress") {
      tasksInProgressEl.appendChild(taskSelected);
    } 
    else if (statusValue === "completed") {
      tasksCompletedEl.appendChild(taskSelected);
    }
    
};


var editTask = function(taskId){
   //  shows the task id of the task beign editted
   console.log("editing task # " + taskId);

   // get task list item element
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

   //get content from task name
   var taskName = taskSelected.querySelector("h3.task-name").textContent
   
   //get content from task name
   var taskType = taskSelected.querySelector("span.task-type").textContent

   console.log("task selected name " + taskName);
   console.log("task selected Type# " + taskType);

   //
   document.querySelector("input[name='task-name']").value = taskName;
   document.querySelector("select[name='task-type']").value = taskType;

   //
   document.querySelector("#save-task").textContent = "Save Task";

   // adds the task id to the task being editted
   formEL.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId){
   console.log("This is the task id " + taskId);
   var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");
   taskSelected.remove();

};



// create a new task
formEL.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEL.addEventListener("click", taskButtonHandler);


// for changing the status
pageContentEL.addEventListener("change", taskStatusChangeHandler);