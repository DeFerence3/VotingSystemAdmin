import { db } from "./firebase.js";

const headers = document.querySelectorAll("th");

let currentHeader = 0;
let id = 0;

window.onload = nameFetch;

adminUpdater.addEventListener("click", function () {
  if(!(document.getElementById("nm").value==""))
  {
    console.log(document.getElementById("nm").value);
    console.log(currentHeader);
    updateusername();
  }
});

function updateusername()
{
  if(!(document.getElementById("unm").value==""))
  {
    console.log(document.getElementById("unm").value);
    console.log(currentHeader);
    updatepassword();
  }
}

function updatepassword()
{
  if(!(document.getElementById("pass").value==""))
  {
    console.log(document.getElementById("pass").value);
    console.log(currentHeader);
  }
}

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

function highligterOnAdminEdit() {
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
