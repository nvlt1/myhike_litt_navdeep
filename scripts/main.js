function read_display_Quote(){
    //console.log("insde the function")

    //get into the right collection
    db.collection("quotes").doc("tuesday")
    .onSnapshot(tuesdayDoc => {
        console.log(tuesdayDoc.data());
        document.getElementById("quote-goes-here").innerHTML=tuesdayDoc.data().quote;
    })
}
read_display_Quote();

function insertName(){
    // to check if the user is logged in: 
    firebase.auth().onAuthStateChanged(user => {
        if (user){
            console.log(user.uid); // lets me know who the user is that logged in to get the UID
            currentUser = db.collection("users").doc(user.uid); // will go to firestore and to the document of the user
            currentUser.get().then(userDoc => {
                // get the user name
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                document.getElementById("name-goes-here").innerHTML=user_Name;
                // $("name-goes-here").text(user_Name); is the jquery way to what the line above does
            })
        }
    })
}
insertName();
function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
        code:"BBY01",
        name: "Burnaby Lake Park Trail",    //replace with your own city?
        city: "Burnaby",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Elmo goes here regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    //replace with your own city?
        city: "Anmore",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Elmo goes here regularly"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Elmo goes here regularly"
    });
} // call this function by console in the live server and type in writeHikes
