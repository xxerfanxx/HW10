let contactsDB = [];
let selectedRow;

const showCreateBtn = document.querySelector(".show-create-button");
const backFromCreateBtn = document.querySelector(".back-from-create-button");
const submitNewContact = document.querySelector(".submit-new-contact-button");
const closeContactInfoBtn = document.querySelector(".close-contact-info-button");
const deleteContactBtn = document.querySelector(".delete-contact-button");

let createContactBlock = document.querySelector(".create-contact-block");
let mainBlock = document.querySelector(".container");
let header = document.querySelector(".header");
let contactInfoBlock = document.querySelector(".contact-info-block");

let searchBar = document.querySelector(".search-bar__input");

let firstNameInput = document.querySelector(".fname-input__text");
let phoneNumberInput = document.querySelector(".phone-input__text");

showCreateBtn.addEventListener('click', showCreateContactBlock);
backFromCreateBtn.addEventListener('click', showContainer);
submitNewContact.addEventListener('click', submitContact);
closeContactInfoBtn.addEventListener('click', closeContactInfo);
deleteContactBtn.addEventListener('click', ()=>(deleteContact(this)));
searchBar.addEventListener('change', checkFilter)

function submitContact(){
    if(firstNameInput.value && phoneNumberInput.value){
        createContact(firstNameInput.value,"", phoneNumberInput.value);
        firstNameInput.value = "";
        phoneNumberInput.value = "";
    }
}

function checkFilter(){

    if(searchBar.value){
        displayContacts(searchBar.value);
    }
    else{
        displayContacts();
    }
}

function randomColor() {
    let colorArr = ['bg-red-400','bg-blue-400','bg-orange-400','bg-green-400','bg-yellow-400','bg-purple-400', 'bg-pink-400', 'bg-violet-400'];

    return colorArr[(Math.floor(Math.random() * colorArr.length))];
}

function showCreateContactBlock(){
    createContactBlock.classList.remove('hidden');
    mainBlock.classList.add('hidden');
    header.classList.add('hidden');
}

function showContainer(){
    mainBlock.classList.remove('hidden');
    header.classList.remove('hidden');
    createContactBlock.classList.add('hidden');
}

function createContact(fname, lname, pnum){

    saveContact(fname, lname, pnum);
    displayContacts();
    showContainer();

}

function saveContact(fname, lname="", pnum){

    let contactInfo = {
        first_name : fname,
        last_name : lname,
        phone_number : pnum
    };

    if (!contactInfo.phone_number || !contactInfo.first_name ){
        return false;
    }

    if(contactsDB){
        if(contactsDB.includes(contactInfo)){
            return false
        }
    }

    contactsDB.push(contactInfo);

    localStorage.setItem("contacts_data_base", JSON.stringify(contactsDB));
}

function displayContacts(filter=""){
    contactsDB = JSON.parse(localStorage.getItem("contacts_data_base"));

    if(filter && contactsDB){
        let filteredArr = [];
        
        for(i=0;i<contactsDB.length;i++){
            for(let key in contactsDB[i]){
                if(contactsDB[i][key].includes(filter)){
                    filteredArr.push(contactsDB[i]);
                }
            }
        }

        contactsDB = filteredArr;
    }

    if(!contactsDB){
        contactsDB = [];
    }

    let contactTable = document.querySelector('.contacts');
    contactTable.innerHTML = "";
    let row = contactTable.insertRow(0);
    let nameCell = row.insertCell(0);
    let phoneCell = row.insertCell(1);
    nameCell.innerHTML = `<h1 class="inline w-4 ml-4 font-bold">Name</h1>`;
    phoneCell.innerHTML = `<h1 class="w-1/2 font-bold">Phone number</h1>`;


    if(contactsDB){
        for(i=0;i<contactsDB.length;i++){
            let row = contactTable.insertRow(1);
            let nameCell = row.insertCell(0);
            let phoneCell = row.insertCell(1);

            let fname = contactsDB[i].first_name;
            let lname = contactsDB[i].last_name;
            let pnum = contactsDB[i].phone_number;

            let color = randomColor();

            nameCell.innerHTML = `<div class="${randomColor()} w-6 h-6 rounded-full inline-block mx-2 my-2"><h1 class="mt-[-3px] ml-2">${fname.slice(0,1)}</h1></div><h1 class="inline w-4">${fname + " " + lname}</h1>`;
            phoneCell.innerHTML = `<h1 class="w-1/2 ">${pnum}</h1>`;

            row.classList.add(`${fname}-${pnum}`)
            row.classList.add('cursor-pointer')
            row.classList.add('hover:bg-gray-50')

            row.addEventListener('click', ()=>(showContactInfo(row.classList)));
        }
    }
}

function showContactInfo(rowClasses){
    mainBlock.classList.add('hidden');
    header.classList.add('hidden');
    contactInfoBlock.classList.remove('hidden');

    let fnameLabel = document.querySelector('.full-name__text');

    let name_pnum = rowClasses[0].split('-');
    let fname = name_pnum[0];
    let pnum = name_pnum[1];

    fnameLabel.innerText = `${fname} \n ${pnum}`;
    selectedRow = rowClasses[0];
}

function closeContactInfo(){
    mainBlock.classList.remove('hidden');
    header.classList.remove('hidden');
    contactInfoBlock.classList.add('hidden');
}

function deleteContact(contact){
    let fname = selectedRow.split('-')[0];
    let pnum = selectedRow.split('-')[1];
    contactRow = document.querySelector(`.${selectedRow}`);
    closeContactInfo();
    for(i=0;i<contactsDB.length;i++){
        if(contactsDB[i].first_name == fname && contactsDB[i].phone_number == pnum){
            contactsDB.splice(i, 1);
            break;
        }
    }
    contactRow.remove();
    localStorage.setItem("contacts_data_base", JSON.stringify(contactsDB));
}

displayContacts();