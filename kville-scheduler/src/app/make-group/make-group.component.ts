import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-make-group',
  templateUrl: './make-group.component.html',
  styleUrls: ['./make-group.component.css']
})
export class MakeGroupComponent implements OnInit {

  constructor(private http: Http, private userService: UserService, private router: Router) { }

  ngOnInit() {
  }


  data = {
    groupName: "",
    start: "",
    end: "",
    type: "",
    members : [],
  }

  tenting = {
    blackStart: "2018-01-12T23:00",
    blueStart: "2018-01-26T23:00",
    whiteStart: "2018-02-09T23:00",
  }


  addMember(){
    for(let i = 0; i < 3; i++){
      this.data.members.push({
        first: 'Tenter',
        last: JSON.stringify(this.data.members.length+1),
        phone: '123-456-7890'
      });
    }
  }

  removeMember(){
    for(let i = 0; i < 3; i++){
      this.data.members.pop();
    }
    if(this.data.members.length === 0){
      this.addMember();
    }
  }

  tent(){
    this.data.members.length = 0;
    for(let i = 0; i < 4; i++){
      this.addMember();
    }
  }

  wul(){
    this.data.members.length = 0;
    this.addMember();
  }

  submit(){
    if(this.data.start > this.data.end){
      alert("Start date must be before the end date. Please validate your input");
      return;
    }
    this.data['tenting'] = this.tenting;
    let info = {
      data: this.data,
      key: this.userService.getKey()
    };
    console.log('making group')
    this.http.post('/api/create-group', info)
    .subscribe((post)=>{
      if(!post.ok) console.log(post);
      this.http.post('/api/clone-sheet', {info: info, groupID: post.text()}).subscribe((post)=>{
        this.router.navigate(['pick-group']);
      })
    });
  }

}
