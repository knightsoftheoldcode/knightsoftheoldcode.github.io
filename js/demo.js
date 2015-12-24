var firebaseDemo = new Firebase('https://kotoc-demo.firebaseio.com/');

var loggedInUser = null;


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

function saveDemoUser(authData) {
    var usersRef = firebaseDemo.child("users");
    
    var userRef = usersRef.child(authData.uid);
    
    userRef.set(authData);
};

function checkDemoLogin() {
    var signupButton = document.getElementById('signup-button');
    var loginButton = document.getElementById('login-button');
    
    var signupLabel = "Signup";
    var loginLabel = "Login";
    
    if (loggedInUser) {
        
    }
    
    signupButton.firstChild.data = signupLabel;
    loginButton.firstChild.data = loginLabel;
    
    $('#signupVerificationAlert').hide();
    $('#loginVerificationAlert').hide();
    $('#logoutVerificationAlert').hide();
    
    firebaseDemo.onAuth(authDataCallback);
};

// Create a callback which logs the current auth state
function authDataCallback(authData) {
  $('#loginVerificationAlert').hide();
  $('#logoutVerificationAlert').hide();
  $('#login-button').prop('disabled', false);
  $('#logout-button').prop('disabled', false);
    
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
    $('#loginVerificationMessage').text("User " + authData.uid + " is logged in with " + authData.provider);
    $('#loginVerificationAlert').show();
    $('#login-button').prop('disabled', true);
  } else {
    console.log("User is logged out");
    $('#logoutVerificationMessage').text("User is logged out");
    $('#logoutVerificationAlert').show();
    $('#logout-button').prop('disabled', true);
  }
}

function demoSignup() {
    var signupEmail = $('#signupEmail').val();
    var signupPassword = $('#signupPassword').val();
    
//    alert('signupEmail: ' + signupEmail + ', signupPassword: ' + signupPassword);
    
    firebaseDemo.createUser({
      email    : signupEmail,
      password : signupPassword
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
        $('#signupError').text(error);
        $('#signupButton').removeClass('btn-primary').addClass('btn-danger');
        setTimeout(function() {$('#signupButton').removeClass('btn-danger').addClass('btn-primary');}, 2000);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        $('#signupVerificationMessage').text("Successfully created user account with uid: " + userData.uid + " Please log in below.");
        $('#signupVerificationAlert').show();
//        loggedInUser = userData;
        $('#signupModal').modal('hide');
      }
    });
    
//    checkDemoLogin();
};

function demoLogin() {
    var loginEmail = $('#loginEmail').val();
    var loginPassword = $('#loginPassword').val();
    
//    alert('loginEmail: ' + loginEmail + ', loginPassword: ' + loginPassword);
    
    firebaseDemo.authWithPassword({
      email    : loginEmail,
      password : loginPassword
    }, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
        $('#loginError').text(error);
        $('#loginButton').removeClass('btn-primary').addClass('btn-danger');
        setTimeout(function() {$('#loginButton').removeClass('btn-danger').addClass('btn-primary');}, 2000);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        $('#loginModal').modal('hide');
        
        saveDemoUser(authData);
      }
    });    
//    checkDemoLogin();
};

function demoLogout() {
    firebaseDemo.unauth();    
};

