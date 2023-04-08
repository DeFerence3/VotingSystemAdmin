/* imports  */
import { db } from "./firebase.js";

/* Variables declared */
const bk = document.getElementById("beck");
const addvote = document.getElementById("addvote");
const thumbnails = document.getElementById("thumb");
const create = document.getElementById("create");
const cancell = document.getElementById("cancel");
const menutoggler = document.getElementById("menutogglebutton");

/* after window is loaded ,data from firebase is fetched */
window.onload = electionFetcher();

function electionFetcher() {
  /* see firebase documentation for better understanding of this functions(search:fetch data from firebase) */
  db.collection("Election_Data")
    .get()
    .then((querySnapshot) => {
      var details = [];
      querySnapshot.forEach((doc) => {
        details.push(doc.data());
      });
      docFetcher(details);
    });
}

function docFetcher(docArray) {
  docArray.forEach((element) => {
    electionBoxCreater(element.Name, element.Date);
  });
}
/* logs out of the current session */
bk.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.replace("../index.html");
});

/* add vote popup visibler */
addvote.addEventListener("click", function (event) {
  var rform = document.querySelector(".form-box");
  var blur = document.querySelector(".bgform");
  rform.style.display = "inline-flex";
  blur.style.display = "flex";
});

/* unvisibler */
cancell.addEventListener("click", function () {
  canceller();
});

function canceller() {
  var rform = document.querySelector(".form-box");
  var blur = document.querySelector(".bgform");
  rform.style.display = "none";
  blur.style.display = "none";
}

/* creates new election */
create.addEventListener("click", function (event) {
  var election = document.getElementById("eleccat").value;
  var date = new Date().toLocaleString();
  electionBoxCreater(election, date);
  canceller();
});

/* create each election boxes */
function electionBoxCreater(electionName, date) {
  var newBox = document.createElement("div");
  newBox.setAttribute("class", "box");

  var newInner = document.createElement("div");
  newInner.setAttribute("class", "inner");

  var newDetails = document.createElement("div");
  newDetails.setAttribute("class", "details");

  var newH = document.createElement("h2");
  var dateP = document.createElement("p");

  newH.innerHTML = electionName;
  dateP.innerHTML = date;

  var newButton = document.createElement("a");
  newButton.setAttribute("class", "button fit");
  newButton.setAttribute("href", "./electionDetails.html");
  newButton.innerHTML = "View";

  newDetails.appendChild(newH);
  newDetails.appendChild(dateP);
  newInner.appendChild(newDetails);
  newInner.appendChild(newButton);
  newBox.appendChild(newInner);
  thumbnails.appendChild(newBox);
}

/* menu toggler */
menutoggler.addEventListener("click", function () {
  document.getElementById("menutoggler").classList.toggle("open");
});
