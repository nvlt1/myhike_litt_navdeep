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
        name: "Richmond Lake Park Trail",    //replace with your own city?
        city: "Richmond",
        province: "BC",
        level: "easy",
        length: "10 km",
        details: "Nav goes here regularly"
    });
    hikesRef.add({
        code:"AM01",
        name: "Buntzen Lake Trail Trail",    //replace with your own city?
        city: "Vancouver",
        province: "BC",
        level: "moderate",
        length: "10.5 km",
        details: "Nav goes here regularly"
    });
    hikesRef.add({
        code:"NV01",
        name: "Mount Seymoure Trail",    //replace with your own city?
        city: "North Vancouver",
        province: "BC",
        level: "hard",
        length: "8.2 km",
        details: "Nav goes here regularly"
    });
} // call this function by console in the live server and type in writeHikes

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            var i = 1;
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;   // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = "./images/" + collection + ".jpg"; //hikes.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                i++;
            })
        })
}

displayCards("hikes");
