const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;

    setTimeout(() => {
        message.textContent = "";
        message.className = "";
    }, 2000);
}

addTaskBtn.addEventListener("click", () => {

    const task = taskInput.value.trim();

    if(task === ""){
        showMessage("Task cannot be empty!", "error");
        return;
    }

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const btnGroup = document.createElement("div");
    btnGroup.className = "task-buttons";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    editBtn.addEventListener("click", () => {

        const newTask = prompt("Edit your task:", span.textContent);

        if(newTask !== null){

            if(newTask.trim() === ""){
                showMessage("Task cannot be empty!", "error");
            }
            else{
                span.textContent = newTask.trim();
                showMessage("Task updated successfully!", "success");
            }

        }

    });

    deleteBtn.addEventListener("click", () => {
        li.remove();
        showMessage("Task deleted successfully!", "success");
    });

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(btnGroup);

    taskList.appendChild(li);

    taskInput.value = "";

    showMessage("Task added successfully!", "success");

});

taskInput.addEventListener("keypress", function(event){

    if(event.key === "Enter"){
        addTaskBtn.click();
    }

});