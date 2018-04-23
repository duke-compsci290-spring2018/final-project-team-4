
import {Injectable} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  handleSignOutClick(event):void {
    gapi.auth2.getAuthInstance().signOut();

    signedIn = false;

    // var user = firebase.auth().currentUser;

    // if (user) {
    //   console.log(user);
    // } else {
    //   console.log('no user');
    // }
  }

}

// import {initializeApp,database} from 'firebase';

// export const firebaseConfig = {
//     apiKey: "AIzaSyAIyT1Uzas9K0oAKNBXMej7sTW_dXJRvZk",
//     authDomain: "k-ville-schedule-builder.firebaseapp.com",
//     databaseURL: "https://k-ville-schedule-builder.firebaseio.com",
//     projectId: "k-ville-schedule-builder",
//     storageBucket: "k-ville-schedule-builder.appspot.com",
//     messagingSenderId: "123382215531"
// };

// initializeApp(firebaseConfig);

// database().ref().on('value', snapshot => console.log(snapshot.val()));