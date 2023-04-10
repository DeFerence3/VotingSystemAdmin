import { adminAuther } from "./argon2.js";
import { db } from "./firebase.js";

const skipp = document.getElementById("skp");
const headers = document.querySelectorAll("th");
const err = document.getElementById("err");
const submiter = document.getElementById("submit");
let currentHeader = 0;
let id = 0;
let a = 0;

highligter();
window.onload = nameFetch;
//skip button
skipp.onclick = function () {
  a++;
  if (a > 2) {
    skipp.style.display = "none";
  }
  err.style.display = "none";
  highligter();
  form.reset();
};

//formSumbitHandler
submiter.addEventListener("click", function (event) {
  var name = document.getElementById("unm").value;
  var pass = document.getElementById("pass").value;
  let adminid = "Admin" + id;

  adminAuther(name, pass, adminid);
});

//function to highlight each admin's name on a succesfull login and a skip
export function highligter() {
  id++;
  err.style.display = "none";
  if (currentHeader > 0) {
    headers[currentHeader - 1].classList.remove("foc");
  }

  if (currentHeader >= 7) {
    currentHeader = 0;
    window.location.replace("./pages/main.html");
  }

  headers[currentHeader].classList.add("foc");
  currentHeader++;
  document.getElementById("unm").value = "";
  document.getElementById("pass").value = "";
}

//fetching adminnames from db and displayes in header
function nameFetch() {
  var admNum = 1;
  db.collection("Admin_User")
    .get()
    .then((querySnapshot) => {
      var details = [];
      querySnapshot.forEach((doc) => {
        details.push(doc.data());
      });
      details.forEach((element) => {
        var e = document.getElementById("adm" + admNum);
        e.textContent = element.Name;
        admNum++;
      });
    });
}
