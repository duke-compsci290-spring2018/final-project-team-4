import { Component } from '@angular/core';
import { Http } from '@angular/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private http:Http) { }

  test(){
    var auth = gapi.auth2.getAuthInstance().currentUser.get();
    var props = {auth: auth}
    this.http.post('/api/clone-sheet', props)
    .subscribe((posts) =>{
      console.log(posts)
    })
  }

  logginName() {
    if (! gapi.auth2.getAuthInstance().isSignedIn.get()) {
      return '';
    }
    return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
  }

  signedIn() {
    // return gapi.auth2.getAuthInstance().isSignedIn.get();
    return true
  }
}
