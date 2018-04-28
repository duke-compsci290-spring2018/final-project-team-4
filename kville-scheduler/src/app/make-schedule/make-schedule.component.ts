import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service'

@Component({
  selector: 'app-make-schedule',
  templateUrl: './make-schedule.component.html',
  styleUrls: ['./make-schedule.component.css']
})
export class MakeScheduleComponent implements OnInit {

  members = [];

  constructor(private http: Http, private userService: UserService) {
    // this.http.get('/api/get-members/-LBCihT7H5tCuCSSwSCs')
    // .subscribe((post)=>{
    //   console.log('yay')
    // });
  }

  ngOnInit() {
  }




}
