import { db } from "./firebase.js";

window.onload = nameFetch;

adminUpdater.addEventListener("click", function () {
  var a=currentHeader;
  a++;
  const aid = "Admin"+a;
  console.log(aid);
  updatename(aid);
});

function updatename(_aid) {
  const aid = _aid;
  console.log(aid);
  if(!(document.getElementById("nm").value==""))
  {
    const nm = document.getElementById("nm").value;
    const data = {
      Name:nm,
    }
    docref.update(data).then(() => {
      console.log("Success!");
      updateusername(aid);
    }).catch((error) => {
      console.log("Error!", error);
    });
  }
  updateusername(aid);
}

function updateusername(_aid)
{
  const aid = _aid;
  console.log(aid);
  var docref = db.collection("Admin_User").doc(aid);
  if(!(document.getElementById("unm").value==""))
  {
    const unm = document.getElementById("unm").value;
    argon2.hash({
      pass:unm,
      salt:random(16),
      time:2,
      mem:16384,
      hashLen:32,
      parallelism:1,
      type:argon2.ArgonType.Argon2id,

      }).then(h => {
        const hashunm = h.encoded;
        console.log(hashunm);
        const data = {
          Username:hashunm,
        };

        docref.update(data).then(() => {
          console.log("Success!");
          updatepassword(aid);
        }).catch((error) => {
          console.log("Error!", error);
        });

      }).catch(e => {
        console.error("Error hashing!",e.message, e.code);
      });
  }
  updatepassword(aid);
}

function updatepassword(_aid)
{
  const aid = _aid;
  console.log(aid);
  var docref = db.collection("Admin_User").doc(aid);
  if(!(document.getElementById("pass").value==""))
  {
    const pass = document.getElementById("pass").value;
    argon2.hash({
      pass:pass,
      salt:random(16),
      time:2,
      mem:16384,
      hashLen:32,
      parallelism:1,
      type:argon2.ArgonType.Argon2id,

      }).then(h => {
        const hashpass = h.encoded;
        console.log(hashpass);
        const data = {
          Password:hashpass,
        }

        docref.update(data).then(() => {
          console.log("Success!");
        }).catch((error) => {
          console.log("Error!", error);
        });

      }).catch(e => {
        console.error("Error hashing!",e.message, e.code);
      });
  }
  document.getElementById("form").reset();
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
