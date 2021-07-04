const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_TROUGH = "lineTrough";

let LIST, id;

let data = localStorage.getItem("TODO");

if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
}

function loadList(array){
    array.forEach(function(item){
        addTask(item.name, item.id, item.done);
    });
}

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

const options = {weekday : "long", month:"short", day:"numeric"};

const today=  new Date();

dateElement.innerHTML = today.toLocaleDateString("nl-be", options);

function addTask(task, id, done, trash){
    
    if(trash){return;}

    const DONE = done ? CHECK : UNCHECK
    const LINE = done ? LINE_TROUGH : "";


    const item = `<li class="item">
    <i class="fa fa-circle-thin co" job="complete" id="${id}"></i>
    <p class="text">${task}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    <li>`;
    
    const position = "beforeend";

    list.insertAdjacentElement(position, item);
}

document.addEventListener("keyup", function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        if(toDo){
            addTask(toDo, id, false, false)
            LIST.push({
                name : toDo, 
                id : id,
                done : false,
                trash : false,
            });
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
});

function completeTask(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_TROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeTask(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element = event.target;

    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeTask(element);
    }else if(element == "delete"){
        removeTask(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});



