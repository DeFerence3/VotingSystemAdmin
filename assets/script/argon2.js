/* imports  */
import { db } from "./firebase.js";
import { highligter } from "./script.js";

const err = document.getElementById("err");

export function adminAuther(name, pass, adminid) {
  var docref = db.collection("Admin_User").doc(adminid);
  docref
    .get()
    .then((doc) => {
      if (doc.exists) {
        let uname = doc.data().Username;
        let pswd = doc.data().Password;

        console.log(uname);
        console.log(pswd);

        argon2
          .verify({ pass: name, encoded: uname })
          .then(() => {
            argon2
              .verify({ pass: pass, encoded: pswd })
              .then(() => {
                highligter();
              })
              .catch((e) => {
                console.log("ErrorPass:" + e);
                err.style.display = "block";
              });
          })
          .catch((e) => {
            console.log("ErrorUnm:" + e);
            err.style.display = "block";
          });
      } else {
        console.log("No Document!");
      }
    })
    .catch((err) => {
      console.log("Error:" + err);
    });
}

export function verifier(user, pass) {
  argon2
    .hash({
      // required
      pass: pass,
      salt: random(16),
      // optional
      time: 2,
      mem: 16384, // used memory, in KiB
      hashLen: 32, // desired hash length
      parallelism: 1, // desired parallelism (it won't be computed in parallel, however)
      type: argon2.ArgonType.Argon2id, // Argon2d, Argon2i, Argon2id
    })
    // result
    .then((res) => {
      res.hash; // hash as Uint8Array
      res.hashHex; // hash as hex-string
      console.log(res.encoded);
    })
    // or error
    .catch((err) => {
      console.log("errMessage" + err.message); // error message as string, if available
      console.log("errCode:" + err.code); // numeric error code
    });
}
/* */
