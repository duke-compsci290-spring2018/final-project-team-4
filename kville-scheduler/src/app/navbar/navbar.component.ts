
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { GoogleSignInSuccess } from 'angular-google-signin';
import { Http } from '@angular/http'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private http: Http) { }

  ngOnInit() {  }

  user: any;
  private clientID: string = '123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com';
  // private clientID: string = 'client 123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com'

  onSuccess(event: GoogleSignInSuccess) {
    let googleUser: gapi.auth2.GoogleUser = event.googleUser;
    let idk = gapi.auth2.getAuthInstance().currentUser.get()
    let id: string = googleUser.getId();
    let profile: gapi.auth2.BasicProfile = googleUser.getBasicProfile();
    // console.log(googleUser.getAuthResponse())
    // console.log(id)
    // console.log(profile)
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    console.log(idk)
    this.user = idk;
    this.http.post('/api/save-user', {auth: idk.getAuthResponse()})
    .subscribe((post) =>{
      console.log(post)
    });
  }

  handleSignOutClick(event):void {
    gapi.auth2.getAuthInstance().signOut()
  }

  isLoggedIn(){
  	return gapi.auth2.getAuthInstance().isSignedIn.get();
  }

  test(){
    let body = {auth: this.user.getAuthResponse()}
    this.http.post('api/clone-sheet', body).
    subscribe((post) =>{
      console.log(post);
    });
  }
  // loginName(){
  //   console.log('running')
  // 	if (! gapi.auth2.getAuthInstance().isSignedIn.get()) {
  // 	}
  // 	this.user = gapi.auth2.getAuthInstance().currentUser.get()//.getBasicProfile().getName();
  // }

}
