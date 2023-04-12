import { db } from "./firebase.js";

const headers = document.querySelectorAll("th");

let currentHeader = 0;
let id = 0;
var hId = 1,
  tempHId;

fns(0);

highligterOnAdminEdit();
window.onload = nameFetch;

export function fns(tempHId) {
  headers[hId].classList.remove("foc");
  hId = tempHId;
  headers[tempHId].classList.add("foc");
}

adminCreater.addEventListener("click", function () {
  var name = document.getElementById("unm").value;
  var pass = document.getElementById("pass").value;
  argon2
    .hash({
      // required
      pass: pass,
      salt: random(16),
      // optional
      time: 2,
      mem: 16384,
      hashLen: 32,
      parallelism: 1,
      type: argon2.ArgonType.Argon2d,
    })
    // result
    .then((res) => {
      res.hash;
      res.hashHex;
      console.log(res.encoded);
    })
    // or error
    .catch((err) => {
      console.log("errMessage" + err.message); // error message as string, if available
      console.log("errCode:" + err.code); // numeric error code
    });
});

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

export function highligterOnAdminEdit() {
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

function nameFetchRealTime() {
  var admNum = 1;
  db.collection("Admin_User")
    .doc("Admin" + admNum)
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

/* const docRef = firebase.firestore().collection("myCollection").doc("myDoc");

// Subscribe to changes in the document
docRef.onSnapshot((doc) => {
  const data = doc.data();
  const container = document.getElementById("data-container");

  if (data) {
    // Update the UI with the new data
    container.innerHTML = `
            <p>Name: ${data.name}</p>
            <p>Age: ${data.age}</p>
          `;
  } else {
    // Show a message if the document doesn't exist
    container.innerHTML = "<p>Document not found</p>";
  }
}); */
