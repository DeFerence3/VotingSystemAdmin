import { db, store } from "./firebase.js";

const bk = document.getElementById("beck");
const filePicker = document.getElementById("pimg");
const submiter = document.getElementById("submit");
const form = document.querySelector("form");

bk.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.replace("../index.html");
});

filePicker.addEventListener("change", function displayName() {
  var fileInputName = filePicker.files[0].name;
  var fileNameSpan = document.getElementById("fileName");
  fileNameSpan.textContent = fileInputName;
});

submiter.addEventListener("click", async function (event) {
  event.preventDefault();

  var uname = document.getElementById("unm").value;

  argon2
    .hash({
      pass: uname,
      salt: random(16),
      time: 2,
      mem: 16384,
      hashLen: 32,
      parallelism: 1,
      type: argon2.ArgonType.Argon2id,
    })
    .then((h) => {
      const hashuname = h.encoded;
      argonpass(hashuname);
    })
    .catch((e) => console.error(e.message, e.code));
});

function argonpass(_hashuname) {
  const hashuname = _hashuname;
  var pass = document.getElementById("pwd").value;
  argon2
    .hash({
      pass: pass,
      salt: random(16),
      time: 2,
      mem: 16384,
      hashLen: 32,
      parallelism: 1,
      type: argon2.ArgonType.Argon2id,
    })
    .then((h) => {
      const hashpass = h.encoded;
      firestoreupload(hashuname, hashpass);
    })
    .catch((e) => console.error(e.message, e.code));
}

function firestoreupload(_hashuname, _hashpass) {
  var vid = document.getElementById("vid").value;
  const hashuname = _hashuname;
  const hashpass = _hashpass;
  var collectionref = db.collection("Test_User").doc(vid);

  const data = {
    Username: hashuname,
    Password: hashpass,
  };

  collectionref
    .set(data)
    .then(() => {
      electionupdate(vid);
      imageupload(vid);
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

function electionupdate(_voterid) {
  var voterid = _voterid;
  var voterdocument = db.collection("Test_User").doc(voterid);
  var electioncollection = db.collection("Election_Data");

  electioncollection.get().then((querySnapshot) => {
    // Loop through the documents
    querySnapshot.forEach((doc) => {
      // doc.data() is the document contents
      const docid = doc.id;
      const data = {
        [docid]: 0,
      };

      voterdocument
        .update(data)
        .then(() => {
          form.reset();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    });
  });
}

function imageupload(_voterid) {
  const file = document.getElementById("pimg").files[0];
  const storageRef = store.ref().child("user_profile/" + _voterid);
  const uploadTask = storageRef.put(file);

  var rform = document.querySelector(".progressIndicator");
  var blur = document.querySelector(".bgform");

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      var pgbr = document.getElementById("progressBar");
      rform.style.display = "inline-flex";
      blur.style.display = "flex";
      pgbr.innerText = "Creating Acc:" + progress + "%";
    },
    (error) => {
      // Handle unsuccessful uploads
      pgbr.innerText = "Creating Acc: Something went Wrong" + progress + "%";
      console.log("errUpload:" + error);
    },
    () => {
      rform.style.display = "none";
      blur.style.display = "none";
      alert("Account Creation Succesfull!!");
    }
  );
}
