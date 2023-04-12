/* import { db } from "./firebase.js";

const headers = document.querySelectorAll("th");



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
} */

import { btss } from "./mainscript";

function onklik(param) {
  param.id
}
