var months = [  "January", "February", "March",  "April", "May", "June", "July",  "August", "September", "October",  "November", "December"];
import { db } from "./firebase.js";
var sbtbuton = document.getElementById("submit");
sbtbuton.addEventListener("click", function (event){
    event.preventDefault();

    const elnm = document.getElementById("eltp").value;
    var st = document.getElementById("elst").value;
    const stt = Number(st);
    var et = document.getElementById("eled").value;
    const ett = Number(et)
    const ct1 = document.getElementById("ct1").value;
    const ct2 = document.getElementById("ct2").value;
    const ct3 = document.getElementById("ct3").value;
    const ct4 = document.getElementById("ct4").value;
    const date = new Date(document.getElementById("eldt").value);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const month = months[monthIndex];
    const formattedDate = day + " " + month + " " + year;

    // generate a random number between 10000000 and 99999999
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
    // convert the number to a string
    const randomString = randomNumber.toString();
    // check if the string is exactly 8 characters long
    const eid = randomString.padEnd(8, '0');

    var docref = db.collection("Election_Data").doc(eid);
    const data = {
        Name: elnm,
        Date: formattedDate,
        startTime: stt,
        endTime: ett,
    };

    docref.set(data).then(() => {
        addcontestants(eid,ct1,ct2,ct3,ct4);
    }).catch((error) => {
        console.error("Error adding New election: ", error);
    });
});

function addcontestants(_elid,_ct1,_ct2,_ct3,_ct4)
{
    const eid = _elid;
    const ct1 = _ct1;
    const ct2 = _ct2;
    const ct3 = _ct3;
    const ct4 = _ct4;

    var docref = db.collection("Election_Data").doc(eid);

    const data = {
        Contestant1: ct1,
        Contestant2: ct2,
        Contestant3: ct3,
        Contestant4: ct4,
    }

    const nonNullData = {};
    // Copy non-null fields into new object
    Object.keys(data).forEach(key => {
        if (data[key] !=="") {
            nonNullData[key] = data[key];
        }
    });

    docref.update(nonNullData).then(() => {
        addtovoter(eid);
    }).catch((error) => {
        console.error("Error adding Contestants: ", error);
    });
}

function addtovoter(_elid)
{
    const eid = _elid;
    const data = {
        [eid]:0,
    };
    var voterdoc = db.collection("Test_User");
    const batch = db.batch();
    voterdoc.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {

                const docref = voterdoc.doc(doc.id);
                batch.update(docref, data);
            });
        return batch.commit();
    })
    .then(() => {
        notaadd(eid);
    })
    .catch((error) => {
        console.error("Error!", error);
    });
}

function notaadd(_elid)
{
    var eid = _elid;
    var estatref = db.collection("Election_Stats").doc(eid);
    const data = {
        NOTA: 0,
    };
    estatref.set(data).then(() => {
        addctstat(eid);
    }).catch((error) => {
        console.error("Error: ", error);
    });
}

function addctstat(_elid)
{
    var eid = _elid;
    var estatref = db.collection("Election_Stats").doc(eid);
    for(var i=1; i<=4; i++)
    {
        const ctid = "ct"+i;
        console.log(ctid);
        if(!(document.getElementById(ctid).value==""))
        {
            console.log(document.getElementById(ctid).value);
            const ct = "Contestant"+i;
            const data = {
                [ct]:0,
            };
            estatref.update(data).then(() => {
                console.log("Success!");
                window.location.replace("main.html");
            }).catch((error) => {
                console.error("Error: ", error);
            });
        }
    }
}