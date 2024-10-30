let database = {to_do:[],doing:[],done:[]};

let toDoContainer = document.querySelector('.to-do');
let doingContainer = document.querySelector('.doing');
let doneContainer = document.querySelector('.done');

let toDoTasksContainer = toDoContainer.querySelector('.tasks');
let doingTasksContainer = doingContainer.querySelector('.tasks');
let doneTasksContainer = doneContainer.querySelector('.tasks');


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
                color
            });

            break;
        
        case "doing":
            
            database.doing.push({
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color
            });

            break;

        case "done":

            database.done.push({
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color
            });

            break;
        
        default:
            console.log('Error in adding the task(invalid type');
            break;
    }
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
        
        toDoTasksContainer.innerHTML += `<li>
                <div class="task w-96 mx-auto ${database.to_do[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                  <div class="top-row flex flex-row justify-between">
                    <button class="edit-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                    <h1 class="task__title text-center text-2xl">${database.to_do[i].title}</h1>
                    <button class="delete-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                  </div>

                  <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                    <p class="task__details w-full">${database.to_do[i].description}</p>
                  </div>

                  <div class="task__tags">
                    <ul class="tags flex flex-row w-full my-2">
                        ${tagsHTML}
                    </ul>
                  </div>

                  <div class="task__footer flex flex-row justify-between mt-2">
                    <h3 class="task__doer text-xs">${database.to_do[i].taskDoer}</h3>
                    <h3 class="task__creation-date text-xs">created: ${database.to_do[i].creationDate}</h3>
                    <h3 class="task__due-date text-xs">due: ${database.to_do[i].dueDate}</h3>
                  </div>
                </div>
              </li>`
    }

    for(i = 0; i < database.done.length; i++){

        let tagsHTML = "";
        for(j = 0; j < database.done[i].tags.length; j++){
            tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.done[i].tags[j]}</li>`;
        }
        
        doneTasksContainer.innerHTML += `<li>
                <div class="task w-96 ${database.done[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                  <div class="top-row flex flex-row justify-between">
                    <button class="edit-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                    <h1 class="task__title text-center text-2xl">${database.done[i].title}</h1>
                    <button class="delete-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                  </div>

                  <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                    <p class="task__details w-full">${database.done[i].description}</p>
                  </div>

                  <div class="task__tags">
                    <ul class="tags flex flex-row w-full my-2">
                        ${tagsHTML}
                    </ul>
                  </div>

                  <div class="task__footer flex flex-row justify-between mt-2">
                    <h3 class="task__doer text-xs">${database.done[i].taskDoer}</h3>
                    <h3 class="task__creation-date text-xs">created: ${database.done[i].creationDate}</h3>
                    <h3 class="task__due-date text-xs">due: ${database.done[i].dueDate}</h3>
                  </div>
                </div>
              </li>`
    }

    for(i = 0; i < database.doing.length; i++){

        let tagsHTML = "";
        for(j = 0; j < database.doing[i].tags.length; j++){
            tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.doing[i].tags[j]}</li>`;
        }
        
        doingTasksContainer.innerHTML += `<li>
                <div class="task w-96 ${database.doing[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                  <div class="top-row flex flex-row justify-between">
                    <button class="edit-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                    <h1 class="task__title text-center text-2xl">${database.doing[i].title}</h1>
                    <button class="delete-task__button w-6 h-6"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                  </div>

                  <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                    <p class="task__details w-full">${database.doing[i].description}</p>
                  </div>

                  <div class="task__tags">
                    <ul class="tags flex flex-row w-full my-2">
                        ${tagsHTML}
                    </ul>
                  </div>

                  <div class="task__footer flex flex-row justify-between mt-2">
                    <h3 class="task__doer text-xs">${database.doing[i].taskDoer}</h3>
                    <h3 class="task__creation-date text-xs">created: ${database.doing[i].creationDate}</h3>
                    <h3 class="task__due-date text-xs">due: ${database.doing[i].dueDate}</h3>
                  </div>
                </div>
              </li>`
    }
}

createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('doing','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('done','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('done','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
console.log(database)
displayCards();