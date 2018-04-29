import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router'


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
    blackStart: "",
    blueStart: "",
    whiteStart: "",
    tentingEnd: ""
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
      console.log('invalid');
      alert("Start date must be before the end date. Please validate your input");
      return;
    }
    if(this.data.type === "Tent"){
      this.data['tenting'] = this.tenting;
    }
    let info = {
      data: this.data,
      key: this.userService.getKey()
    };
    console.log(info)
    this.http.post('/api/create-group', info)
    .subscribe((post)=>{
      if(!post.ok) console.log(post);
      this.router.navigate(['']);
    });
  }

}
