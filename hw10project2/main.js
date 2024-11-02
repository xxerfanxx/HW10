// const { data } = require("autoprefixer");

// async function getData() {
//   const url = "https://6724febfc39fedae05b38add.mockapi.io/task";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error(error.message);
//   }
// }

const newData = {title : 'erfan assy', description : 'lol'}

fetch("https://6724febfc39fedae05b38add.mockapi.io/task",{
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify(newData)
})
.then(response=>response.json())
.then(data=>console.log('updated:',data))
.catch(error=>console.error('error creating data',error))
