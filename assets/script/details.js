import { db } from "./firebase.js";
window.onload = detailFetcher;

const bk = document.getElementById("bkbutton");
var table = document.getElementById("detailstable");

function detailFetcher() {
  const param = new URLSearchParams(location.search);
  const elcId = param.get("param");
  db.collection("Election_Data")
    .doc(elcId)
    .get()
    .then((doc) => {
      if (doc.exists) {

        var name = document.getElementById("elecname");
        name.textContent = doc.data().Name;

        var date = document.getElementById("elecdate");
        date.textContent = doc.data().Date;

        var tdtime = document.getElementById("electime");
        var time = doc.data().startTime + ":00:00 - " + doc.data().endTime + ":00:00";
        tdtime.textContent = time;

        for (var id = 1; id<=100; id++)
        {
          const ctid = "Contestant" + id;
          if(doc.data().hasOwnProperty(ctid))
          {

            var newrow = document.createElement("tr");
            var newhead = document.createElement("th");
            var newtd = document.createElement("td");

            const cntid = "Contestant " + id;

            newhead.textContent = cntid;
            newtd.textContent = doc.data()[ctid];


            newrow.appendChild(newhead);
            newrow.appendChild(newtd);
            table.appendChild(newrow);
          }
          else
          {
            id=101;
          }
        }

        const collectionRef = db.collection("Test_User");
          collectionRef.get()
            .then(querySnapshot => {

              const numberOfDocs = querySnapshot.size;
              var newrow = document.createElement("tr");
              var newhead = document.createElement("th");
              var newtd = document.createElement("td");

              newhead.textContent = "Number of Eligible Voters";
              newtd.textContent = numberOfDocs;

              newrow.appendChild(newhead);
              newrow.appendChild(newtd);
              table.appendChild(newrow);
            })
            .catch(error => {
            console.error("Error getting collection documents: ", error);
          });

          const userlist = db.collection("Test_User");
          const votedlist = userlist.where(elcId, "==",1);
          votedlist.get()
            .then(querySnapshot => {
              const numberOfDocs = querySnapshot.size;
              var newrow = document.createElement("tr");
              var newhead = document.createElement("th");
              var newtd = document.createElement("td");

              newhead.textContent = "Number of Voters Voted";
              newtd.textContent = numberOfDocs;

              newrow.appendChild(newhead);
              newrow.appendChild(newtd);
              table.appendChild(newrow);
            })
            .catch(error => {
            console.error("Error getting collection documents: ", error);
          });

      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}

bk.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.replace("main.html");
});