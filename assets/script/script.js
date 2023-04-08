import { adminAuther } from "./argon2.js";

const skipp = document.getElementById('skp');
const headers = document.querySelectorAll('th');
const err = document.getElementById('err');
const submiter = document.getElementById('submit');
let currentHeader = 0;
let id = 1;
let a=0;

highligter();

//skip button
skipp.onclick = function(){
  a++;
  if(a>2){
    id++;
    skipp.style.display='none';
  }
  else{
    id++;
  }
  err.style.display = "none";
  highligter();
  form.reset();
};

//formSumbitHandler
submiter.addEventListener("click",function(event){
  event.preventDefault();
  
  var name = document.getElementById("unm").value;
  var pass = document.getElementById("pass").value;
  let adminid = "Admin"+id;
  if(adminAuther(name,pass,adminid)){
    //if login is succesfull clears the form and highlights next admins name
    id++;
    highligter();
  }
  else{
    //else throws a error message
    err.style.display = "block";
  }
})

//function to highlight each admin's name on a succesfull login and a skip
function highligter(){

  err.style.display = "none";
  if(currentHeader > 0){
    headers[currentHeader -1].classList.remove('foc');
  }

  if(currentHeader >= 7){
    currentHeader = 0
    window.location.replace("./pages/main.html");
  }
  
  headers[currentHeader].classList.add('foc');
  /* var x  = document.getElementsById('jaba');
  var d = x.innerHTML;
  console.log(x);
  console.log(d);
  this.window.alert("hi") */
  currentHeader++;
  document.getElementById("unm").value = "";
  document.getElementById("pass").value = "";
}
