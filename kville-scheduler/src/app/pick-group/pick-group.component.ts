import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service'

@Component({
  selector: 'app-pick-group',
  templateUrl: './pick-group.component.html',
  styleUrls: ['./pick-group.component.css']
})
export class PickGroupComponent implements OnInit {

  groups

  constructor(private userService: UserService, private http: Http) {
  }

  ngOnInit() {
    console.log('getting groups yo')
    this.http.get('/api/get-groups/'+this.userService.getKey())
    .subscribe((post)=>{
      console.log(post)
    });
  }

}
