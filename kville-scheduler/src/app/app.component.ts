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
    var test = {name: "test1"}
    this.http.post('/api/test', test)
    .subscribe((posts) =>{
      console.log(posts)
    })
  }
}
