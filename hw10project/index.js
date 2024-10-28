const showCreateBtn = document.querySelector(".show-create-button");
const backFromCreateBtn = document.querySelector(".back-from-create-button")


let createContactBlock = document.querySelector(".create-contact-block")
let mainBlock = document.querySelector(".container")
let header = document.querySelector(".header")

showCreateBtn.addEventListener('click', showCreateContactBlock);
backFromCreateBtn.addEventListener('click', showContainer);

function showCreateContactBlock(){
    createContactBlock.classList.remove('hidden')
    mainBlock.classList.add('hidden')
    header.classList.add('hidden')
}

function showContainer(){
    mainBlock.classList.remove('hidden')
    header.classList.remove('hidden')
    createContactBlock.classList.add('hidden')
}

function createContact(fname, lname, pnum){

    let contactTable = document.querySelector('.contacts');
    let row = contactTable.insertRow(1);
    let nameCell = row.insertCell(0);
    let phoneCell = row.insertCell(1);

    nameCell.innerHTML = `<div class="w-6 h-6 rounded-full bg-blue-300 inline-block mx-2 my-2"><h1 class="mt-[-3px] ml-2">${fname.slice(0,1)}</h1></div><h1 class="inline w-4">${fname + " " + lname}</h1>`;
    phoneCell.innerHTML = `<h1 class="w-1/2 ">${pnum}</h1>`;

}

function saveContact(fname, lname, pnum){

    let contactInfo = {
        first_name:fname,
        last_name:lname,
        phone_number:pnum
    }

    localStorage()
}

createContact("erfan","ghasemian","09112868820");
createContact("ali","ghasemian","09112868820");