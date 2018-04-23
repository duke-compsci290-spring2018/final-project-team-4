
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

  user = {};

  onSignIn(){
    console.log('yay')
  }

  handleSignOutClick(event):void {
    console.log(this.user)
    gapi.auth2.getAuthInstance().signOut();
  }

  isLoggedIn(){
  	return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  loginName(){
    console.log('running')
  	if (! gapi.auth2.getAuthInstance().isSignedIn.get()) {
  		this.user = '';
  	}
  	this.user = gapi.auth2.getAuthInstance().currentUser.get()//.getBasicProfile().getName();
  }

}
