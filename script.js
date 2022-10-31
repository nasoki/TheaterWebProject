const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnAddNewTask = document.querySelector("#btnAddNewTask");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let todos;

//items'a eklenen elemanları listeye dönüştüren fonksiyon
loadItems();

eventListeners();

function eventListeners() {
    //add a new item to the list
    form.addEventListener("submit", addNewItem);
    //delete an item from the list
    taskList.addEventListener("click", deleteItem);
    //delete all items from the list
    btnDeleteAll.addEventListener("click", deleteAllItems);
}

function loadItems() {
    todos = getItemsFromLS();
    todos.forEach(function (item) {
        createItem(item);
    })
}

//get items from local storage
function getItemsFromLS()
{
    if(localStorage.getItem("todos") === null)
    {
        todos = [];
    }
    else
    {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

//set item to local storage
function setItemToLS(newToDo)
{
    todos = getItemsFromLS(newToDo);
    todos.push(newToDo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function createItem(newToDo)
{
    //li oluşturma (task oluşturma)
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-secondary";
    li.appendChild(document.createTextNode(newToDo));

    //yeni eklenen task'e özelliklerini verme
    const a = document.createElement("a");
    a.classList = "delete-item float-right";
    a.setAttribute("href", "#");
    a.innerHTML = "<i class = 'fas fa-times'></i>";

    //yeni task'i listeye ekleme
    li.appendChild(a);
    taskList.appendChild(li);
}

//add new task
function addNewItem(e)
{
    if (input.value == "") {
        alert("Task area can't be empty");
        console.log("submit");
    }

    //create a new item
    createItem(input.value);
    setItemToLS(input.value);

    input.value = "";

    e.preventDefault();
}

//delete a task
function deleteItem(e)
{
    if (e.target.className === "fas fa-times") {
        if (confirm("Are you sure about that? This action cannot be undone!")) {
            console.log("deleted item");
            e.target.parentElement.parentElement.remove();
            deleteToDoFromStorage(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

function deleteToDoFromStorage(deletetodo)
{
    let todos = getItemsFromLS();
    todos.forEach(function(todo, index)
    {
        if (todo === deletetodo)
        {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}

//delete all tasks
function deleteAllItems(e) {
    if (confirm("Are you sure you want to delete ALL tasks? This action cannot be undone!"))
    {
        while (taskList.firstChild)
        {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
}