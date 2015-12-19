var myDataRef = new Firebase('https://knightsoftheoldcode.firebaseio.com/');

var name = 'tricorius';
var text = 'hello firebase'; 

myDataRef.push({name: name, text: text});