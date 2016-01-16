---
layout: post
title:  "Jekyll and Firebase - Basics"
date:   2015-12-24
author: tricorius
description: "Getting started integrating real-time website features with Jekyll and Firebase"
series: jekyll-and-firebase
categories: article
tags:
- jekyll
- firebase
---

This article series explores code driving dynamic data in an otherwise static website. 

In order to follow along, you'll need to create a free account with [Firebase](https://www.firebase.com/login/). You can use the default application created for you during the account creation process, but I recommend creating a new database with a custom name (for instance the application for this website is named knightsoftheoldcode and is referencable at https://knightsoftheoldcode.firebaseio.com/).

You'll then need to add the firebase script to the ```<head>``` section of your HTML template. (In this site, that is part of ```_layouts/default.html```).

{% highlight html %}
<script src="https://cdn.firebase.com/js/client/2.3.2/firebase.js"></script>
{% endhighlight %}

Firebase provides several features. The first feature we'll be focusing on is its database. If you're familiar with standard SQL databases, Firebase may feel a little awkward at first, but it makes sense when you see it for what it is. A Firebase database is stored and represented as JSON objects.

This actually meshes extremely well with JavaScript code running inside a browser (or anywhere else, for that matter). We can easily setup data read and write operations on a variety of user or application actions.

It is also wise to provide an externally-linked file in which you store your JavaScript code. This can be stored in various places (and in large projects will likely be managed by a build script to create optimized files) but I generally store it in a ```/js/main.js``` file. I then reference this file in the core HTML page (such as ```_layouts/default.html```).

{% highlight html %}
<script src="{{ "/js/main.js" | prepend: site.baseurl }}"></script>
{% endhighlight %}

The source code of the repository that drives this site contains a more complete example if you're curious as to how it all fits together. Now that we have the necessary files linked in, we can fill in the first bit of code and test a Firebase write.

```/js/main.js```

{% highlight html %}
var myDataRef = new Firebase('https://YOURAPPNAME.firebaseio.com/');


function testFirebaseSet() {
    var usersRef = myDataRef.child("users");
    
    var username = 'tricorius';
    var email = 'tricorius@knightsoftheoldcode.com';
    
    var userRef = usersRef.child(username);
    
    userRef.set({email: email});
};

testFirebaseSet();
{% endhighlight %}

Since Firebase stores data as JSON it is easy to map data to a series of keys. The code above connects to your top-level Firebase. It then links to a child node (creating it if needed) called "users". It finally links to (and creates if needed) another child node (of "users") wth the username entered in the ```username``` variable.

The JSON representation of which looks like:

{% highlight json %}
{
  "users" : {
    "tricorius" : {
      "email" : "tricorius@knightsoftheoldcode.com"
    }
  }
}
{% endhighlight %}

It's also depicted in the Firebase in-browser dashboard.

![For Those About to Edit](/img/firebase-users.png)

<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title">The Firebase Dashboard</h3>
  </div>
  <div class="panel-body">
    <p>The wizards over at Firebase truly deal with exceptional magic. The data tool provides a real-time representation of the data manipulated by your application. As your users access the various Firebase enabled features on your site you'll see real-time updates in the data browser (as they see them in their browsers).</p>
    <p>We will demonstrate some of this behavior over the course of this series.</p>
  </div>
</div>

It is important to note that Firebase' ```set``` will overwrite information in child nodes if you aren't careful. We are very specifically getting a *child* node with the username (which should succesfully leave other child nodes in ```users``` intact).

Modifying the data values for ```username``` and ```email``` as below should prove this point to ourselves.

{% highlight html %}
...    
    var username = 'merlin';
    var email = 'merlin@camelot.com';
...
{% endhighlight %}

{% highlight json %}
{
  "users" : {
    "merlin" : {
      "email" : "merlin@camelot.com"
    },
    "tricorius" : {
      "email" : "tricorius@knightsoftheoldcode.com"
    }
  }
}
{% endhighlight %}

Note that using ```set``` will overwrite existing data when the key matches. For instance, provided the data above, if we were to use ```set``` on either "merlin" or "tricorius" to add a notes field, we would have to also include the email address in the set request. If we were to call a set with just the notes field, it would replace the whole user child node effectively erasing the email field (and any other fields). The ```update``` method will properly add a field while maintaining existing fields. (*We will cover this in more detail later on...we mention it now because we don't want you wiping your production data.*)

<div class="alert alert-warning" role="alert">Using <strong>set()</strong> will overwrite the data at the specified location, including any child nodes..</div>

A common pattern with dynamic data is appending a new entry to an existing list of entries. Blog posts, comments, calendar events...the possibilities are virtually endless. It's actually *less* common to store a single instance of a data item than it is to store multiple instances. In a real-time multi-user ennvironment this can be tricky. This concept is known as concurrency.

Concurrency is *significantly* simplified with the Firebase library. The ```push``` method abstracts this by handling the complex concurrecy issues and returning a unique identifier to your application code.

{% highlight javascript %}
var myDataRef = new Firebase('https://YOURAPPNAME.firebaseio.com/');


function testFirebaseSet() {
    var usersRef = myDataRef.child("users");
    
    var username = 'tricorius';
    var email = 'tricorius@knightsoftheoldcode.com';
    
    var userRef = usersRef.child(username);
    
    userRef.set({email: email});
};

function testFirebasePush() {
    var usersRef = myDataRef.child("users");
    
    var username = 'tricorius';
    var clickedAt = new Date();
    
    var userClicksRef = usersRef.child(username + '/clicks');
    
    userClicksRef.push({clickedAt: clickedAt.toString()});
};

testFirebaseSet();
{% endhighlight %}

{% highlight html %}
<button class="btn btn-default" type="button" onclick="testFirebasePush();">Add Click</button>
{% endhighlight %}

{% highlight json %}
{
  "users" : {
    "merlin" : {
      "email" : "merlin@camelot.com"
    },
    "tricorius" : {
      "clicks" : {
        "-K66ZNGLGGsPlK4CeCUE" : {
          "clickedAt" : "Mon Dec 21 2015 19:43:00 GMT-0700 (MST)"
        },
        "-K66ZNu7Uh4yiUujxFbW" : {
          "clickedAt" : "Mon Dec 21 2015 19:43:03 GMT-0700 (MST)"
        },
        "-K66ZOOhe721NRbOF2Db" : {
          "clickedAt" : "Mon Dec 21 2015 19:43:05 GMT-0700 (MST)"
        },
        "-K66ZOrcxaWx0lc86XAy" : {
          "clickedAt" : "Mon Dec 21 2015 19:43:07 GMT-0700 (MST)"
        },
        "-K66ZPBWQwh6sik9mwnz" : {
          "clickedAt" : "Mon Dec 21 2015 19:43:08 GMT-0700 (MST)"
        }
      },
      "email" : "tricorius@knightsoftheoldcode.com"
    }
  }
}
{% endhighlight %}

<button class="btn btn-default" type="button" onclick="testFirebasePush();">Add Click</button>
<button class="btn btn-default" type="button" onclick="clearFirebasePush();">Clear Clicks</button>

As one would expect, Firebase makes reading data fairly easy as well. As an example we'll modify the "Add Click" button introduced above to have a reactive component. Below is a list which acts as a container to show entries created from clicking the "Add Click" button above. *(You may see some initial items or see items appear as other people viewing this page click the "Add Click" button. This is not a full synch demo as that would require some additional code and isn't the current focus.)*

<ul class="list-unstyled" id="firebase-demo-add-click-results">
</ul>

{% highlight javascript %}
var firebaseDemo = new Firebase('https://YOURAPPNAME.firebaseio.com/');


function testFirebaseSet() {
    var usersRef = firebaseDemo.child("users");
    
    var username = 'tricorius';
    var email = 'tricorius@knightsoftheoldcode.com';
    
    var userRef = usersRef.child(username);
    
    userRef.set({email: email});
    
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

testFirebaseSet();
{% endhighlight %}

The above touches on just a few of the potential options Firebase provides. Firebase offers incredible value on top of a static website engine like Jekyll. The philisophical debates will rage on as to whether one shuld even add dynamic capability to a static site, but I believe there are plenty of good reasons to do so. (I'll be unveiling many over the course of this website.)

At some point, however, you probably do need to make a determination if the funtionality you need ends up being a full web application. If you get to this point, you can always refactor your dynamic features into a web app running on a subdomain of your site and keep your static content lean and mean.

<script>
document.addEventListener("DOMContentLoaded", function(event) { 
  bindFirebasePush();
});
</script>

