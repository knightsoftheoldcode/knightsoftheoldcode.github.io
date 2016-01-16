---
layout: post
title:  "Jekyll and Firebase - Email / Password Authentication"
date:   2016-01-09
author: tricorius
description: "Authentication in statically-generated websites with Jekyll and Firebase"
series: jekyll-and-firebase
categories: article
tags:
- jekyll
- firebase
- authentication
---

This article assumes familiarity with the previous articles in the series, building upon principles learned therein. This article is an intermediate level tutorial and additionally assumes basic web development knowledge. As such, we won't cover core HTML like using twitter bootstrap to create buttons and dialogs. (We'll primarily cover the JavaScript code required to support the backend systems.)

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title">Open-Source Blogging</h3>
  </div>
  <div class="panel-body">
    <p>Although some articles on Knights of the Old Code are meant for intermediate to advanced developers, we don't want anyone to get lost. If this feels beyond your understanding, please examine some of our less advanced tutorials first (such as the "Conjuring a Website" series and then come back to the more advanced material. The source code for this site is available on Github. Another excellent option is to get on the mailing list for our upcoming companion book and video series that breaks the "Conjuring a Website" series into more granular concepts.</p>
  </div>
</div>

<div class="alert alert-danger alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <strong>Security Alert!</strong> This website is currently <em>not</em> secure. This will change in the future (when a login link is added to the site navigation and the site is served across an SSL connection). This article is intended only as a demonstration of Firebase authentication. Please do <strong>not</strong> enter any secure information into the forms on this site. Please ensure that you follow proper security protocol before releasing secure features on your site. These warnings will dissappear from the site when the site has been properly secured.
</div>


<!-- Button trigger modal -->
<button id="signup-button" type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#signupModal">
  Signup
</button>

<div id="signupVerificationAlert" class="alert alert-success alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <p id="signupVerificationMessage"></p>
</div>

<button id="login-button" type="button" class="btn btn-default btn-lg btn-block" data-toggle="modal" data-target="#loginModal">
  Login
</button>

<div id="loginVerificationAlert" class="alert alert-success alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <p id="loginVerificationMessage"></p>
</div>

<button id="logout-button" type="button" class="btn btn-default btn-lg btn-block" onclick="demoLogout();">
  Logout
</button>

<div id="logoutVerificationAlert" class="alert alert-success alert-dismissible" role="alert">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
  <p id="logoutVerificationMessage"></p>
</div>


The above buttons link to two JavaScript functions in the ```/js/main.js``` file:

{% highlight javascript %}
function demoSignup() {
    var signupEmail = $('#signupEmail').val();
    var signupPassword = $('#signupPassword').val();
        
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
        $('#signupModal').modal('hide');
      }
    });
};
{% endhighlight %}

If we run this code, we'll most likely encounter an error message.

![For Those About to Edit](/img/authentication-firebase-error-configuration.png)

This Firebase createUser() call is attempting to create a user using the email/password method. By default, this is not enabled for an application. We need to enable it.

In the Firebase "User Login & Authentication" panel, we see that we can check "Enable Email & Password Authentication". There are quite a few options Firebase gives for customizing email/password based authentication. These will be covered in future tutorials.

After enabling the authentication method you should be able to provide accurate values and your user should appear in the dashboard below the password reset configuration.

You should also get a friendly success message beneath the Signup button. Creating a user in Firebase does *not* automatically log a user in. You must manually call the login method (in this example we are asking the user to click a separate button for demonstration purposes, a real-world application would likely just call the login method after getting the all-clear from Firebase verifying a user account creation).

```/js/main.js```:

{% highlight javascript %}
function demoLogin() {
    var loginEmail = $('#loginEmail').val();
    var loginPassword = $('#loginPassword').val();
    
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
        $('#loginVerificationMessage').text("Authenticated successfully with uid: " + authData.uid);
        $('#loginVerificationAlert').show();
        $('#loginModal').modal('hide');
        
        saveDemoUser(authData);
      }
    });    
};
{% endhighlight %}

If the login succeeds we get a helpful success message and the user information is stored in the database.

{% highlight javascript %}
function saveDemoUser(authData) {
    var usersRef = firebaseDemo.child("users");
    
    var userRef = usersRef.child(authData.uid);
    
    userRef.set(authData);
};
{% endhighlight %}

Although none of this is complicated, the logout function is probably the most straightforward.

{% highlight javascript %}
function demoLogout() {
    firebaseDemo.unauth();    
};
{% endhighlight %}

At this point we have functional, if basic, authentication in our Firebase app.

<!-- Modal -->
<div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Signup</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="signupEmail" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="signupEmail" placeholder="Email">
            </div>
          </div>
          <div class="form-group">
            <label for="signupPassword" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="signupPassword" placeholder="Password">
            </div>
          </div>
        </form>
        <div class="row">
            <div class="col-md-12">
                <p id="signupError" class="text-danger"></p>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="signupButton" type="button" class="btn btn-primary" onclick="demoSignup();">Signup</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Login</h4>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="loginEmail" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="loginEmail" placeholder="Email">
            </div>
          </div>
          <div class="form-group">
            <label for="loginPassword" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="loginPassword" placeholder="Password">
            </div>
          </div>
        </form>
        <div class="row">
            <div class="col-md-12">
                <p id="loginError" class="text-danger"></p>
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="loginButton" type="button" class="btn btn-primary" onclick="demoLogin();">Login</button>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener("DOMContentLoaded", function(event) { 
  checkDemoLogin();
});
</script>
