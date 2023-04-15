var months = [  "January", "February", "March",  "April", "May", "June", "July",  "August", "September", "October",  "November", "December"];

function addelection()
{
    var date = new Date(document.getElementById("eldt").value);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var month = months[monthIndex];
    var formattedDate = day + " " + month + " " + year;
    console.log(formattedDate);
}