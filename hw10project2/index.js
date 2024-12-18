let database = {to_do:[],doing:[],done:[]};
let id = 0;

if(sessionStorage.getItem('isLogged') == null){
    alert('please login first');
    window.location.href = "login.html";
}
  

let toDoContainer = document.querySelector('.to-do');
let doingContainer = document.querySelector('.doing');
let doneContainer = document.querySelector('.done');

let toDoTasksContainer = toDoContainer.querySelector('.tasks');
let doingTasksContainer = doingContainer.querySelector('.tasks');
let doneTasksContainer = doneContainer.querySelector('.tasks');
let overlayBlock = document.querySelector('.overlay');

let fetchedData = [];

async function fetchData() {
    try {
        const response = await fetch("https://6724febfc39fedae05b38add.mockapi.io/task");
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        fetchedData = await response.json();

        syncData();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchData();

function syncData(){
    if(fetchedData.length > 0){
        id = +fetchedData.at(-1)['id'] + 1;
    }
    else{
        id = 1;
    }

    for(i = 0; i<fetchedData.length ;i++){
        if(fetchedData[i]['type'] == 'to_do'){
            database.to_do.push(fetchedData[i]);
        }
        else if(fetchedData[i]['type'] == 'doing'){
            database.doing.push(fetchedData[i]);
        }
        else{
            database.done.push(fetchedData[i]);
        }
    }

    displayCards();
}

function showEmptyCard(type){
    switch(type){
        case 'to_do':
            createNewTask('to_do','title','description','cdate','due','doer',['tag']);
            editTask(id-1,'to_do');
            break;
        
        case 'doing':
            createNewTask('doing','title','description','cdate','due','doer',['tag']);
            editTask(id-1,'doing');
            break;

        case 'done':
            createNewTask('done','title','description','cdate','due','doer',['tag']);
            editTask(id-1,'done');
            break;
    }
}


function createNewTask(type, title, description, creationDate, dueDate, taskDoer, tags = [], img_url = ""){
    let colors = ['bg-red-200','bg-blue-200','bg-green-200','bg-pink-200','bg-purple-200','bg-yellow-200'];
    let color = colors[Math.floor(Math.random()*colors.length)];

    let newCard

    switch(type){
        case "to_do":

            newCard = {
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id,
                img_url,
                type
            }

            database.to_do.push(newCard);

            fetch("https://6724febfc39fedae05b38add.mockapi.io/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCard)
            })
            .then(console.log(id))

            id++;

            break;
        
        case "doing":
            
            newCard = {
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id,
                img_url,
                type
            }

            database.doing.push(newCard);

            fetch("https://6724febfc39fedae05b38add.mockapi.io/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCard)
            })

            id++;

            break;

        case "done":

            newCard = {
                title,
                description,
                creationDate,
                dueDate,
                taskDoer,
                tags,
                color,
                id,
                img_url,
                type
            }

            database.done.push(newCard);

            fetch("https://6724febfc39fedae05b38add.mockapi.io/task", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCard)
            })

            id++;

            break;
        
        default:
            console.log('Error in adding the task(invalid type');
            break;
    }

    if(document.querySelector('.search-bar').value){
        displayCards(document.querySelector('.search-bar').value);
    }
    else{
        displayCards();
    }
}

function setFilter(){
    let filter = document.querySelector('.search-bar').value;
    let filters = filter.trim().split(' ')
    let filters_tmp = [];
    for(i = 0; i < filters.length; i++){
        if(filters[i].length > 0){
            filters_tmp.push(filters[i])
        }
    }

    filters = filters_tmp;

    displayCards(filters);
}

function displayCards(filters = []){
    toDoTasksContainer.innerHTML = "";
    doingTasksContainer.innerHTML = "";
    doneTasksContainer.innerHTML = "";

    let filter;

    let database_backUp = structuredClone(database);

    if(filters.length > 0){

        let database_tmp1 = {to_do : []};

        for(c = 0; c < database.to_do.length; c++){

            for(j = 0; j < filters.length; j++){
                filter = filters[j];
    
                for(let key in database.to_do[c]){

                    if(key != 'id' && key != 'color' && key != 'img_url' && database.to_do[c][key].includes(filter)){
                        if(!database_tmp1.to_do.includes(database.to_do[c])){
                            database_tmp1.to_do.push(database.to_do[c]);
                        }

                        break;
                    }
                }
            }
        }
        database.to_do = database_tmp1.to_do;
    }

    for(i = 0; i < database.to_do.length; i++){

        let tagsString = "";
        let tagsHTML = "";
        for(j = 0; j < database.to_do[i].tags.length; j++){
            if(database.to_do[i].tags[j].trim()){
                tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.to_do[i].tags[j]}</li>`; 
                tagsString += database.to_do[i].tags[j] + ' ';
            }
        }


        if(database.to_do[i]){
            toDoTasksContainer.innerHTML += `<li class="task-id-${database.to_do[i].id} transition-transform">
                <div class="task w-96 mx-auto ${database.to_do[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                    <div class="top-row flex flex-row justify-between">
                        <button class="edit-task__button w-6 h-6" onclick="editTask(${database.to_do[i].id},'to_do')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                        <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.to_do[i].title}</h1>
                        <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.to_do[i].id},'to_do')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                    </div>

                    <div class="thumbnail w-full my-4">
                        <img class="w-full max-h-60 rounded-md" src="${database.to_do[i].img_url}">
                        <input class="thumbnail-img__input w-full my-2 hidden" placeholder="./Assets/your-img.jpg" value="${database.to_do[i].img_url}">
                    </div>

                    <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner flex flex-col">
                        <p class="task__details w-full max-w-96 break-words">${database.to_do[i].description}</p>
                    </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-4 p-2 overflow-x-auto">
                            ${tagsHTML}
                        </ul>
                        <input class="tag__input w-full hidden" placeholder="tags(seperated by space)" value="${tagsString}">
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
        
    }

    if(filters.length > 0){

        let database_tmp2 = {doing : []};

        for(c = 0; c < database.doing.length; c++){

            for(j = 0; j < filters.length; j++){
                filter = filters[j];
    
                for(let key in database.doing[c]){

                    if(key != 'id' && key != 'color' && key != 'img_url' && database.doing[c][key].includes(filter)){
                        if(!database_tmp2.doing.includes(database.doing[c])){
                            database_tmp2.doing.push(database.doing[c]);
                        }

                        break;
                    }
                }
            }
        }
        database.doing = database_tmp2.doing;
    }

    for(i = 0; i < database.doing.length; i++){

        let tagsString = "";
        let tagsHTML = "";
        for(j = 0; j < database.doing[i].tags.length; j++){
            if(database.doing[i].tags[j].trim()){
                tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.doing[i].tags[j]}</li>`; 
                tagsString += database.doing[i].tags[j] + ' ';
            }
        }
        
        if(database.doing[i]){
            doingTasksContainer.innerHTML += `<li class="task-id-${database.doing[i].id}">
                <div class="task w-96 ${database.doing[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                    <div class="top-row flex flex-row justify-between">
                        <button class="edit-task__button w-6 h-6" onclick="editTask(${database.doing[i].id},'doing')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                        <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.doing[i].title}</h1>
                        <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.doing[i].id},'doing')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                    </div>

                    <div class="thumbnail w-full my-4">
                        <img class="w-full max-h-60 rounded-md" src="${database.doing[i].img_url}">
                        <input class="thumbnail-img__input w-full my-2 hidden" placeholder="./Assets/your-img.jpg" value="${database.doing[i].img_url}">
                    </div>

                    <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                        <p class="task__details w-full max-w-96 break-words">${database.doing[i].description}</p>
                    </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-4 p-2 overflow-x-auto">
                            ${tagsHTML}
                        </ul>
                        <input class="tag__input w-full hidden" placeholder="tags(seperated by space)" value="${tagsString}">
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
        
    }

    if(filters.length > 0){

        let database_tmp3 = {done : []};

        for(c = 0; c < database.done.length; c++){

            for(j = 0; j < filters.length; j++){
                filter = filters[j];
    
                for(let key in database.done[c]){

                    if(key != 'id' && key != 'color' && key != 'img_url' && database.done[c][key].includes(filter)){
                        if(!database_tmp3.done.includes(database.done[c])){
                            database_tmp3.done.push(database.done[c]);
                        }

                        break;
                    }
                }
            }
        }
        database.done = database_tmp3.done;
    }

    for(i = 0; i < database.done.length; i++){

        let tagsString = "";
        let tagsHTML = "";
        for(j = 0; j < database.done[i].tags.length; j++){
            if(database.done[i].tags[j].trim()){
                tagsHTML += `<li class="rounded-2xl bg-blue-300 w-fit px-2 py-[2px] mr-2 text-xs">${database.done[i].tags[j]}</li>`; 
                tagsString += database.done[i].tags[j] + ' ';
            }
        }
        
        if(database.done[i]){
            doneTasksContainer.innerHTML += `<li class="task-id-${database.done[i].id}">
                <div class="task w-96 ${database.done[i].color} rounded-md my-4 p-2 flex flex-col shadow-lg">
                    <div class="top-row flex flex-row justify-between">
                        <button class="edit-task__button w-6 h-6" onclick="editTask(${database.done[i].id},'done')"><img class="w-6 h-6" src="./Assets/edit-icon.png"></button>
                        <h1 class="task__title text-center text-2xl max-w-36 whitespace-nowrap overflow-ellipsis overflow-hidden">${database.done[i].title}</h1>
                        <button class="delete-task__button w-6 h-6" onclick="deleteTask(${database.done[i].id},'done')"><img class="w-6 h-6" src="./Assets/delete-icon.png"></button>
                    </div>

                    <div class="thumbnail w-full my-4">
                        <img class="w-full max-h-60 rounded-md" src="${database.done[i].img_url}">
                        <input class="thumbnail-img__input w-full my-2 hidden" placeholder="./Assets/your-img.jpg" value="${database.done[i].img_url}">
                    </div>

                    <div class="middle-row w-full my-4 bg-white rounded-sm h-fit shadow-inner">
                        <p class="task__details w-full max-w-96 break-words">${database.done[i].description}</p>
                    </div>

                    <div class="task__tags">
                        <ul class="tags flex flex-row w-full my-4 p-2 overflow-x-auto">
                            ${tagsHTML}
                        </ul>
                        <input class="tag__input w-full hidden" placeholder="tags(seperated by space)" value="${tagsString}">
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
    database = structuredClone(database_backUp);
}

function transferTaskNext(id,type){

    switch(type){
        case 'to_do':
            for(i = 0; i < database.to_do.length; i++){
                if(database.to_do[i].id == id){
                    database.doing.push(database.to_do[i]);
                    updateObject(id,{type: 'doing'});
                    deleteTask(id,type,false);
                    displayCards()
                    break;
                }
            }
            break;

        case 'doing':
            for(i = 0; i < database.doing.length; i++){
                if(database.doing[i].id == id){
                    database.done.push(database.doing[i]);
                    updateObject(id,{type: 'done'});
                    deleteTask(id,type,false);
                    displayCards()
                    break;
                }
            }
            break;
    }
    console.log(database)
}

function transferTaskBack(id,type){

    switch(type){
        case 'doing':
            for(i = 0; i < database.doing.length; i++){
                if(database.doing[i].id == id){
                    database.to_do.push(database.doing[i]);
                    updateObject(id,{type: 'to_do'});
                    deleteTask(id,type,false);
                    displayCards()
                    break;
                }
            }
            break;

        case 'done':
            for(i = 0; i < database.done.length; i++){
                if(database.done[i].id == id){
                    database.doing.push(database.done[i]);
                    updateObject(id,{type: 'doing'});
                    deleteTask(id,type,false);
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
    let tagsInput = selectedTask.querySelector('.tag__input');
    let thumbnailInput = selectedTask.querySelector('.thumbnail-img__input');

    let tagsArr = tagsInput.value.split(' ');
    for(i = 0; i < tagsArr.length ; i++){
        if(!tagsArr[i] || tagsArr == " "){
            tagsArr.splice(i,1);
        }
    }

    updateObject(id, {
        title: selectedTaskTitle.innerText,
        description:  selectedTaskDetails.innerText,
        dueDate: selectedTaskDue.innerText,
        creationDate: selectedTaskCreationDate.innerText,
        taskDoer: selectedTaskDoer.innerText,
        tags: tagsArr,
        img_url: thumbnailInput.value
    });

    if (selectedTask.classList.contains('on-edit-mode')){
        selectedTask.classList.remove('on-edit-mode');
        selectedTaskDetails.contentEditable = "false";
        selectedTaskTitle.contentEditable = "false";
        selectedTaskDue.contentEditable = "false";
        selectedTaskDoer.contentEditable = "false";
        selectedTaskCreationDate.contentEditable = "false";
        thumbnailInput.classList.add('hidden');
        tagsInput.classList.add('hidden');

        selectedTaskEditBtn.innerHTML = `<img class="w-6 h-6" src="./Assets/edit-icon.png"></img>`;

        switch(type){
            case 'to_do':
                for(i = 0; i < database.to_do.length; i++){
                    if(database.to_do[i].id == id){
                        database.to_do[i].description = selectedTaskDetails.innerText;
                        database.to_do[i].title = selectedTaskTitle.innerText;
                        database.to_do[i].dueDate = selectedTaskDue.innerText;
                        database.to_do[i].creationDate = selectedTaskCreationDate.innerText;
                        database.to_do[i].taskDoer = selectedTaskDoer.innerText;
                        database.to_do[i].tags = tagsArr;
                        database.to_do[i].img_url = thumbnailInput.value;
                        break;
                    }
                }
                break;
            
            case 'doing':
                for(i = 0; i < database.doing.length; i++){
                    if(database.doing[i].id == id){
                        database.doing[i].description = selectedTaskDetails.innerText;
                        database.doing[i].title = selectedTaskTitle.innerText;
                        database.doing[i].dueDate = selectedTaskDue.innerText;
                        database.doing[i].creationDate = selectedTaskCreationDate.innerText;
                        database.doing[i].taskDoer = selectedTaskDoer.innerText;
                        database.doing[i].tags = tagsArr;
                        database.doing[i].img_url = thumbnailInput.value;
                        break;
                    }
                }
                break;
            
            case 'done':
                for(i = 0; i < database.done.length; i++){
                    if(database.done[i].id == id){
                        database.done[i].description = selectedTaskDetails.innerText;
                        database.done[i].title = selectedTaskTitle.innerText;
                        database.done[i].dueDate = selectedTaskDue.innerText;
                        database.done[i].creationDate = selectedTaskCreationDate.innerText;
                        database.done[i].taskDoer = selectedTaskDoer.innerText;
                        database.done[i].tags = tagsArr;
                        database.done[i].img_url = thumbnailInput.value;
                        break;
                    }
                }
                break;

        }
        selectedTask.classList.remove('fixed');
        selectedTask.classList.remove('top-1/5');
        selectedTask.classList.remove('left-[40%]');
        selectedTask.classList.remove('z-50');
        selectedTask.classList.remove('scale-150');
        overlayBlock.classList.add('hidden');

        if(document.querySelector('.search-bar').value){
            displayCards(document.querySelector('.search-bar').value);
        }
        else{
            displayCards();
        }
    }
    else{
        selectedTask.classList.add('on-edit-mode');
        selectedTaskDetails.contentEditable = "true";
        selectedTaskEditBtn.innerHTML = '<h1 class="text-blue-500 w-20">Confirm</h1>';
        selectedTaskTitle.contentEditable = "true";
        selectedTaskDue.contentEditable = "true";
        selectedTaskDoer.contentEditable = "true";
        selectedTaskCreationDate.contentEditable = "true";
        selectedTask.classList.add('fixed');
        selectedTask.classList.add('top-[15%]');
        selectedTask.classList.add('left-[40%]');
        selectedTask.classList.add('z-50');
        selectedTask.classList.add('scale-150');
        thumbnailInput.classList.remove('hidden');
        tagsInput.classList.remove('hidden');
        overlayBlock.classList.remove('hidden');
    }
}

function updateObject(id, updatedData) {
    const apiUrl = "https://6724febfc39fedae05b38add.mockapi.io/task";

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(`Object with id ${id} updated successfully:`, data);
    })
    .catch(error => console.error("Error updating object:", error));
}


function deleteTask(id, type, applyToApi = true){
    let selectedTask = document.querySelector(`.task-id-${id}`);
    
    if(applyToApi){
        deleteObject(id);
    }

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
    selectedTask.classList.remove('top-[15%]');
    selectedTask.classList.remove('left-[40%]');
    selectedTask.classList.remove('z-50');
    selectedTask.classList.remove('scale-150');
    overlayBlock.classList.add('hidden');
}

function deleteObject(id) {

    const apiUrl = "https://6724febfc39fedae05b38add.mockapi.io/task";

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        console.log(`Object with id ${id} deleted successfully`);
    })
    .catch(error => console.error("Error deleting object:", error));
}


// createNewTask('to_do','first task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'], './Assets/example-background-icon.jpg')
// createNewTask('doing','second task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
// createNewTask('done','third task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'], './Assets/example-background-icon.jpg')
// createNewTask('done','fourth task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'], './Assets/react-js-image.png')
// createNewTask('to_do','fifth task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
// createNewTask('to_do','sixth task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
// createNewTask('to_do','seventh task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])
// createNewTask('to_do','eightth task', 'this is the first task that is important','2024/10/30','2024/11/05','Erfan Ghasemian',['important','UI/UX'])