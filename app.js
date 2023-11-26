var firebaseConfig = {
  apiKey: "AIzaSyBQOvLvWJ_F5hNcKu_E6FNCgoDFTb8Vb04",
  authDomain: "todo-app-28e76.firebaseapp.com",
  databaseURL: "https://todo-app-28e76-default-rtdb.firebaseio.com",
  projectId: "todo-app-28e76",
  storageBucket: "todo-app-28e76.appspot.com",
  messagingSenderId: "545548543466",
  appId: "1:545548543466:web:994f4430bf15d6b798fe93",
  measurementId: "G-2K7QCFL0R3"
};
var frb = firebase.initializeApp(firebaseConfig);



function getitem(){
  var email = document.getElementById ("email");
  var password = document.getElementById ("password");

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
  });

    
}


firebase.database().ref("Todos").on("child_added",(data)=>{
  var liElement = document.createElement("li");

  var liText = document.createTextNode(data.val().value);

  liElement.appendChild(liText);

  // Delete button

  var delbtn = document.createElement("button");

  var delbtnText = document.createTextNode("Delete");

  delbtn.appendChild(delbtnText);

  delbtn.setAttribute("id",data.val().key)

  delbtn.setAttribute("onclick", "deleteItem(this)");

  liElement.appendChild(delbtn);

  //Edit button

  var editbtn = document.createElement("button");

  var editbtnText = document.createTextNode("Edit");

  editbtn.appendChild(editbtnText);

  liElement.appendChild(editbtn);

  editbtn.setAttribute("onclick", "editItem(this)");

  editbtn.setAttribute("id",data.val().key);

  var list = document.getElementById("list");

  list.appendChild(liElement);

  console.log(liElement);

  input.value = "";

})


function addtodo() {

   var input=document.getElementById("inputField")
   console.log(input.value)

   var key = firebase.database().ref("Todos").push().key;
   
   let obj={
    value:input.value,
    key:key,
   };
   firebase.database().ref("Todos").child(key).set(obj)

   input.value="";

  }

 

function deleteAll() {
  var list = document.getElementById("list");

  firebase.database().ref("Todos").remove();

  list.innerHTML = "";
}

function deleteItem(x) {
  console.log(x.id)
  firebase.database().ref("Todos").child(x.id).remove();
  x.parentNode.remove();
}

function editItem(e) {
  
  var input = prompt("Enter updated value...");

  var editTodo={
    value : input,
    key : e.id,
    
  }
  firebase.database().ref("Todos").child(e.id).set(editTodo)

  e.parentNode.firstChild.nodeValue = input;
}
 










 
 
  


