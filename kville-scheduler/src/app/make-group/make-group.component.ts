import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service';


@Component({
  selector: 'app-make-group',
  templateUrl: './make-group.component.html',
  styleUrls: ['./make-group.component.css']
})
export class MakeGroupComponent implements OnInit {

  constructor(private http: Http, private userService: UserService) { }

  ngOnInit() {
  }


  data = {
    groupName: "",
    start: "",
    end: "",
    type: "",
    members : [{
      first: '',
      last: '',
      phone: ''
    }]
  }


  addMember(){
    console.log('pushing')
    this.data.members.push({
      first: '',
      last: '',
      phone: ''
    });
  }

  removeMember(){
    this.data.members.pop();
    if(this.data.members.length === 0){
      this.addMember();
    }
  }

  submit(){
    if(this.data.start > this.data.end){
      console.log('invalid');
      alert("Start date must be before the end date. Please validate your input");
      return;
    }
    let info = {
      data: this.data,
      key: this.userService.getKey()
    };
    console.log(info)
    this.http.post('/api/create-group', info)
    .subscribe((post)=>{
      if(!post.ok) console.log(post)
    });
  }

}
