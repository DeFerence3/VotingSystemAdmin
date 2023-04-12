import { db } from "./firebase.js";
window.onload = detailFetcher;
function detailFetcher() {
  const param = new URLSearchParams(location.search);
  const elcId = param.get("param");
  db.collection("Election_Data")
    .doc(elcId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data().);
        electionBoxCreater(element.Name, element.Date, element.id);
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
