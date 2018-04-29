import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from './user.service';
import { GoogleSignInSuccess } from 'angular-google-signin';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  loggedIn = false;

  constructor(private http:Http, private userService: UserService) { }

  user: any;
  private clientID: string = '123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com';
  // private clientID: string = 'client 123382215531-o3gequic8stoss1s0vj0bdb8pcqvhi7n.apps.googleusercontent.com'

  onSuccess(event: GoogleSignInSuccess) {
    console.log('signed in')
    console.log(this.loggedIn)
    this.loggedIn = true;
    console.log(this.loggedIn)

    let currentUser = gapi.auth2.getAuthInstance().currentUser.get()
    let profile: gapi.auth2.BasicProfile = currentUser.getBasicProfile();
    this.user = currentUser;
    this.userService.setKey(this.user.getBasicProfile().Eea);
    console.log(this.user.getBasicProfile())
    this.http.post('/api/save-user', {auth: this.user.getAuthResponse(), profile: this.user.getBasicProfile()})
    .subscribe((post) =>{
      if(!post.ok) console.log(post);
    });

  }

  test(){
    let body = {auth: this.user.getAuthResponse()}
    this.http.post('api/clone-sheet', body).
    subscribe((post) =>{
      console.log(post);
    });
  }

  handleSignOutClick(event):void {
    gapi.auth2.getAuthInstance().signOut()
  }
}
