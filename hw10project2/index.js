let database = {to_do:[],doing:[],done:[]};
let id = 0;

let toDoContainer = document.querySelector('.to-do');
let doingContainer = document.querySelector('.doing');
let doneContainer = document.querySelector('.done');

let toDoTasksContainer = toDoContainer.querySelector('.tasks');
let doingTasksContainer = doingContainer.querySelector('.tasks');
let doneTasksContainer = doneContainer.querySelector('.tasks');
let overlayBlock = document.querySelector('.overlay');


function createNewTask(type, title, description, creationDate, dueDate, taskDoer, tags = []){
    let colors = ['bg-red-200','bg-blue-200','bg-green-200','bg-pink-200','bg-purple-200','bg-yellow-200'];
    let color = colors[Math.floor(Math.random()*colors.length)];

    switch(type){
        case "to_do":

            database.to_do.push({
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id
            });

            id++;

            break;
        
        case "doing":
            
            database.doing.push({
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id
            });

            id++;

            break;

        case "done":

            database.done.push({
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id
            });

            id++;

            break;
        
        default:
            console.log('Error in adding the task(invalid type');
            break;
    }

    displayCards();
}

function displayCards(){
    toDoTasksContainer.innerHTML = "";
    doingTasksContainer.innerHTML = "";
    doneTasksContainer.innerHTML = "";

    for(i = 0; i < database.to_do.length; i++){

        let tagsHTML = "";
        for(j = 0; j < database.to_do[i].tags.length; j++){
            tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.to_do[i].tags[j]}</li>`;
        }
        
        toDoTasksContainer.innerHTML += `<li class="task-id-${database.to_do[i].id} transition-transform">
                <div class="task w-96 mx-auto ${database.to_do[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                  <div class="top-row flex flex-row justify-between">
                    <button class="edit-task__button w-6 h-6" onclick="editTask(${database.to_do[i].id},'to_do')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                    <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.to_do[i].title}</h1>
                    <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.to_do[i].id},'to_do')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                  </div>

                  <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                    <p class="task__details w-full max-w-96 break-words">${database.to_do[i].description}</p>
                  </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-2">
                            ${tagsHTML}
                        </ul>
                    </div>

                    <div class="task__footer flex flex-row justify-between mt-2">
                        <h3 class="task__doer text-xs max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.to_do[i].taskDoer}</h3>
                        <div class="task__dates flex flex-row">
                            <h3 class="text-xs">created:</h3><h3 class="task__creation-date text-xs mr-10 max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.to_do[i].creationDate}</h3>
                            <h3 class="text-xs">due:</h3><h3 class="task__due-date text-xs max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.to_do[i].dueDate}</h3>
                        </div>
                    </div>
                    <div class="my-2 w-full flex flex-row-reverse"> 
                        <button class="transfer-next__button w-26 h-6 flex flex-row justify-between" onclick="transferTaskNext(${database.to_do[i].id},'to_do')">
                            <h1 class="text-xs">transfer task</h1><img class="transfer-next__img w-4 h-4" src="./Assets/next-icon.png">
                        </button>
                    </div>
                </div>
              </li>`
    }

    for(i = 0; i < database.doing.length; i++){

        let tagsHTML = "";
        for(j = 0; j < database.doing[i].tags.length; j++){
            tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.doing[i].tags[j]}</li>`;
        }
        
        doingTasksContainer.innerHTML += `<li class="task-id-${database.doing[i].id}">
                <div class="task w-96 ${database.doing[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                    <div class="top-row flex flex-row justify-between">
                        <button class="edit-task__button w-6 h-6" onclick="editTask(${database.doing[i].id},'doing')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                        <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.doing[i].title}</h1>
                        <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.doing[i].id},'doing')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                    </div>

                    <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                        <p class="task__details w-full max-w-96 break-words">${database.doing[i].description}</p>
                    </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-2">
                            ${tagsHTML}
                        </ul>
                    </div>

                    <div class="task__footer flex flex-row justify-between mt-2">
                        <h3 class="task__doer text-xs max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.doing[i].taskDoer}</h3>
                        <div class="task__dates flex flex-row">
                            <h3 class="text-xs">created:</h3><h3 class="task__creation-date text-xs mr-10 max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.doing[i].creationDate}</h3>
                            <h3 class="text-xs">due:</h3><h3 class="task__due-date text-xs max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.doing[i].dueDate}</h3>
                        </div>
                    </div>

                    <div class="transfer flex flex-row-reverse mt-2">
                        <div class="my-2 w-full flex flex-row-reverse"> 
                            <button class="transfer-next__button w-26 h-6 flex flex-row justify-between" onclick="transferTaskNext(${database.doing[i].id},'doing')">
                                <h1 class="text-xs">transfer task (next)</h1><img class="transfer-next__img w-4 h-4" src="./Assets/next-icon.png">
                            </button>
                        </div>

                        <div class="my-2 w-full flex flex-row"> 
                            <button class="transfer-next__button w-26 h-6 flex flex-row- justify-between" onclick="transferTaskBack(${database.doing[i].id},'doing')">
                                <img class="transfer-next__img w-[20px] h-[20px]" src="./Assets/back-icon.png"><h1 class="text-xs">transfer task (back)</h1>
                            </button>
                        </div>
                    </div>
                </div>
              </li>`
    }

    for(i = 0; i < database.done.length; i++){

        let tagsHTML = "";
        for(j = 0; j < database.done[i].tags.length; j++){
            tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.done[i].tags[j]}</li>`;
        }
        
        doneTasksContainer.innerHTML += `<li class="task-id-${database.done[i].id}">
                <div class="task w-96 ${database.done[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                    <div class="top-row flex flex-row justify-between">
                        <button class="edit-task__button w-6 h-6" onclick="editTask(${database.done[i].id},'done')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                        <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.done[i].title}</h1>
                        <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.done[i].id},'done')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                    </div>

                    <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                        <p class="task__details w-full max-w-96 break-words">${database.done[i].description}</p>
                    </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-2">
                            ${tagsHTML}
                        </ul>
                    </div>

                    <div class="task__footer flex flex-row justify-between mt-2">
                        <h3 class="task__doer text-xs max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.done[i].taskDoer}</h3>
                        <div class="task__dates flex flex-row">
                            <h3 class="text-xs">created:</h3><h3 class="task__creation-date text-xs mr-10 max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.done[i].creationDate}</h3>
                            <h3 class="text-xs">due:</h3><h3 class="task__due-date text-xs max-w-16 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.done[i].dueDate}</h3>
                        </div>
                    </div>

                    <div class="my-2 w-full flex flex-row"> 
                        <button class="transfer-next__button w-26 h-6 flex flex-row- justify-between" onclick="transferTaskBack(${database.done[i].id},'done')">
                            <img class="transfer-next__img w-[20px] h-[20px]" src="./Assets/back-icon.png"><h1 class="text-xs">transfer task (back)</h1>
                        </button>
                    </div>
                </div>
              </li>`
    }
}

function transferTaskNext(id,type){
    let selectedTask = document.querySelector(`.task-id-${id}`);

    switch(type){
        case 'to_do':
            for(i = 0; i < database.to_do.length; i++){
                if(database.to_do[i].id == id){
                    database.doing.push(database.to_do[i]);
                    deleteTask(id,type);
                    displayCards()
                    break;
                }
            }
            break;

        case 'doing':
            for(i = 0; i < database.doing.length; i++){
                if(database.doing[i].id == id){
                    database.done.push(database.doing[i]);
                    deleteTask(id,type);
                    displayCards()
                    break;
                }
            }
            break;
    }
    console.log(database)
}

function transferTaskBack(id,type){
    let selectedTask = document.querySelector(`.task-id-${id}`);

    switch(type){
        case 'doing':
            for(i = 0; i < database.doing.length; i++){
                if(database.doing[i].id == id){
                    database.to_do.push(database.doing[i]);
                    deleteTask(id,type);
                    displayCards()
                    break;
                }
            }
            break;

        case 'done':
            for(i = 0; i < database.done.length; i++){
                if(database.done[i].id == id){
                    database.doing.push(database.done[i]);
                    deleteTask(id,type);
                    displayCards()
                    break;
                }
            }
            break;
    }
}

function editTask(id,type){
    let selectedTask = document.querySelector(`.task-id-${id}`);
    let selectedTaskDetails = selectedTask.querySelector('.task__details');
    let selectedTaskEditBtn = selectedTask.querySelector('.edit-task__button');
    let selectedTaskTitle = selectedTask.querySelector('.task__title');
    let selectedTaskDue = selectedTask.querySelector('.task__due-date');
    let selectedTaskDoer = selectedTask.querySelector('.task__doer');
    let selectedTaskCreationDate = selectedTask.querySelector('.task__creation-date');

    if (selectedTask.classList.contains('on-edit-mode')){
        selectedTask.classList.remove('on-edit-mode');
        selectedTaskDetails.contentEditable = "false";
        selectedTaskTitle.contentEditable = "false";
        selectedTaskDue.contentEditable = "false";
        selectedTaskDoer.contentEditable = "false";
        selectedTaskCreationDate.contentEditable = "false";

        selectedTaskEditBtn.innerHTML = `<img class="w-6 h-6" src="./Assets/edit-icon.png"></img>`;

        switch(type){
            case 'to_do':
                for(i = 0; i < database.to_do.length; i++){
                    if(database.to_do[i].id == id){
                        database.to_do[i].description = selectedTaskDetails.innerText;
                        database.to_do[i].title = selectedTaskTitle.innerText;
                        break;
                    }
                }
                break;
            
            case 'doing':
                for(i = 0; i < database.doing.length; i++){
                    if(database.doing[i].id == id){
                        database.doing[i].description = selectedTaskDetails.innerText;
                        database.doing[i].title = selectedTaskTitle.innerText;
                        break;
                    }
                }
                break;
            
            case 'done':
                for(i = 0; i < database.done.length; i++){
                    if(database.done[i].id == id){
                        database.done[i].description = selectedTaskDetails.innerText;
                        database.done[i].title = selectedTaskTitle.innerText;
                        break;
                    }
                }
                break;

        }
        console.log(database)
        selectedTask.classList.remove('fixed');
        selectedTask.classList.remove('top-1/3');
        selectedTask.classList.remove('left-[40%]');
        selectedTask.classList.remove('z-50');
        selectedTask.classList.remove('scale-150');
        overlayBlock.classList.add('hidden');
    }
    else{
        selectedTask.classList.add('on-edit-mode');
        selectedTaskDetails.contentEditable = "true";
        selectedTaskEditBtn.innerHTML = '<h1 class="text-blue-300 w-20">edit mode</h1>';
        selectedTaskTitle.contentEditable = "true";
        selectedTaskDue.contentEditable = "true";
        selectedTaskDoer.contentEditable = "true";
        selectedTaskCreationDate.contentEditable = "true";
        selectedTask.classList.add('fixed');
        selectedTask.classList.add('top-1/3');
        selectedTask.classList.add('left-[40%]');
        selectedTask.classList.add('z-50');
        selectedTask.classList.add('scale-150');
        overlayBlock.classList.remove('hidden');
    }
}

function deleteTask(id,type){
    let selectedTask = document.querySelector(`.task-id-${id}`);

    switch(type){
        case 'to_do':
            toDoTasksContainer.removeChild(selectedTask);
            for(i = 0; i < database.to_do.length; i++){
                if(database.to_do[i].id == id){
                    database.to_do.splice(i,1);
                    break;
                }
            }
            break;
        
        case 'doing':
            doingTasksContainer.removeChild(selectedTask);
            for(i = 0; i < database.doing.length; i++){
                if(database.doing[i].id == id){
                    database.doing.splice(i,1);
                    break;
                }
            }
            break;
        
        case 'done':
            doneTasksContainer.removeChild(selectedTask);
            for(i = 0; i < database.done.length; i++){
                if(database.done[i].id == id){
                    database.done.splice(i,1);
                    break;
                }
            }
            break;
    }

    selectedTask.classList.remove('fixed');
    selectedTask.classList.remove('top-1/3');
    selectedTask.classList.remove('left-[40%]');
    selectedTask.classList.remove('z-50');
    selectedTask.classList.remove('scale-150');
    overlayBlock.classList.add('hidden');
}

createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('doing','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('done','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('done','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
