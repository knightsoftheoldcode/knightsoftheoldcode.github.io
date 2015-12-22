var firebaseDemo = new Firebase('https://kotoc-demo.firebaseio.com/');


function testFirebaseSet() {
    var usersRef = firebaseDemo.child("users");
    
    var username = 'tricorius';
    var email = 'tricorius@knightsoftheoldcode.com';
    
    var userRef = usersRef.child(username);
    
    userRef.set({email: email});
};

function bindFirebasePush() {
    var username = 'tricorius';
    
    var usersRef = firebaseDemo.child("users");
    var userClicksRef = usersRef.child(username + '/clicks');
    
    userClicksRef.on("child_added", function(snapshot, prevChildKey) {
      var newClick = snapshot.val();
      console.log("Clicked At: " + newClick.clickedAt);
      console.log("Previous Click ID: " + prevChildKey);
        
      var resultsList = document.getElementById('firebase-demo-add-click-results');
        
      if (resultsList) {
        var entry = document.createElement('li');
        entry.appendChild(document.createTextNode(newClick.clickedAt));
        resultsList.appendChild(entry);
      }
    });
};

function testFirebasePush() {
    var usersRef = firebaseDemo.child("users");
    
    var username = 'tricorius';
    var clickedAt = new Date();
    
    var userClicksRef = usersRef.child(username + '/clicks');
    
    userClicksRef.push({clickedAt: clickedAt.toString()});
};

function clearFirebasePush() {
    var usersRef = firebaseDemo.child("users");
    
    var username = 'tricorius';
    var clickedAt = new Date();
    
    var userClicksRef = usersRef.child(username + '/clicks');
    
    userClicksRef.set({});
    
    var resultsList = document.getElementById('firebase-demo-add-click-results');
    
    resultsList.innerHTML = "";
};
