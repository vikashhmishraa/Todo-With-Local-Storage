let taskfield = document.getElementById("taskfield");
let createBtn = document.querySelector(".createBtn");
let ListCont = document.querySelector(".ListCont");

let TaskBucket = [];

let oldtaks = localStorage.getItem("Tasks");

let parsedArray = oldtaks ? JSON.parse(oldtaks) : [];

if (Array.isArray(parsedArray)) {
  TaskBucket = [...parsedArray];
}

DisplayTasks(TaskBucket);

createBtn.addEventListener("click", function () {
  let taskFieldName = taskfield.value;

  if (taskFieldName.length == 0) {
    return alert("Please Enter Any Task Before Creation");
  }

  let taskObject = {
    id: Date.now(),
    name: taskFieldName,
  };

  TaskBucket.push(taskObject);

  localStorage.setItem("Tasks", JSON.stringify(TaskBucket));
  location.reload();
});

function DisplayTasks(arr) {
  ListCont.innerHTML = "";

  arr.forEach((taskObject) => {
    let id = taskObject.id;

    let TaskCard = document.createElement("div");
    TaskCard.innerHTML = `<div id="taksList" class="taksList">
          <p>#  ${taskObject.name}</p>
          <div>
          <button class="EditBtn">Edit 🖊️ </button>
            <button class="DeleteBtn">Delete ❌ </button>
          </div>
        </div>`;

    let dltBtn = TaskCard.querySelector(".DeleteBtn");

    dltBtn.addEventListener("click", function () {
      ListCont.removeChild(TaskCard); // Change in UI

      let filteredTask = TaskBucket.filter(function (taskObject) {
        return taskObject.id != id;
      });
      TaskBucket = filteredTask;

      localStorage.setItem("Tasks", JSON.stringify(TaskBucket));
    });

    let editBtn = TaskCard.querySelector(".EditBtn");

    editBtn.addEventListener("click", function () {
      let EditTask = prompt("Edit Task", taskObject.name);

      if (EditTask) {
        taskObject.name = EditTask;

        // Update the task in TaskBucket
        let taskIndex = TaskBucket.findIndex((task) => task.id === id);
        if (taskIndex > -1) {
          TaskBucket[taskIndex].name = EditTask;
        }

        // Save the updated TaskBucket to localStorage
        localStorage.setItem("Tasks", JSON.stringify(TaskBucket));

        // Update the UI
        DisplayTasks(TaskBucket);
      }
    });

    ListCont.appendChild(TaskCard);
  });
}
