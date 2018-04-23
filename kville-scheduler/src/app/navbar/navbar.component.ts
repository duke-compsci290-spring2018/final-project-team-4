
import {Injectable} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

var currentUser;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {  }

  onSignIn() {
  	console.log('poop');
  }

  handleSignOutClick(event):void {
    gapi.auth2.getAuthInstance().signOut();
    console.log($cookieStore);

  }

  isLoggedIn(){
  	return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  loginName(){

  	if (! gapi.auth2.getAuthInstance().isSignedIn.get()) {
  		return '';
  	}
  	return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  }

}
