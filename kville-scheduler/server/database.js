var firebase = require('firebase')
var config = {
    apiKey: "AIzaSyAIyT1Uzas9K0oAKNBXMej7sTW_dXJRvZk",
    authDomain: "k-ville-schedule-builder.firebaseapp.com",
    databaseURL: "https://k-ville-schedule-builder.firebaseio.com",
    projectId: "k-ville-schedule-builder",
    storageBucket: "k-ville-schedule-builder.appspot.com",
    messagingSenderId: "123382215531"
  }

var db = firebase.initializeApp(config).database()

//insert references here
var groupRef = db.ref('groups')

const database = {
  "database": db,
  "groups": groupRef
}
module.exports = database
