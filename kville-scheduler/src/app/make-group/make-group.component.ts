import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-group',
  templateUrl: './make-group.component.html',
  styleUrls: ['./make-group.component.css']
})
export class MakeGroupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  data = {
    groupName: "",
    start: "",
    end: "",
    type: "",
    users : [{
      first: '',
      last: '',
      phone: ''
    }]
  }


  addMember(){
    this.data.users.push({
      first: '',
      last: '',
      phone: ''
    });
  }

  removeMember(){
    this.data.users.pop();
    if(this.data.users.length === 0){
      this.addMember();
    }
  }

  submit(){
    if(this.data.start > this.data.end){
      console.log('invalid');
      alert("Start date must be before the end date. Please validate your input");
      return;
    }
    console.log(this.data)

  }

}
