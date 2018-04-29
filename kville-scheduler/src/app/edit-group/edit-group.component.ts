import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service'

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  members = [];
  newMembers = []

  constructor(private http: Http, private userService: UserService) {
    this.http.get('/api/get-members/-LBEax8hyLCpfa_FHIRA')
    .subscribe((post)=>{
      console.log(post)
      this.members = post.json();
      this.newMembers = post.json();
    });
  }

  ngOnInit() {
  }


  submit(){
    this.http.post('/api/edit-group', {group: '-LBEax8hyLCpfa_FHIRA', newMembers: this.newMembers}).
    subscribe((post) =>{
      console.log(post)
    });
  }

}
