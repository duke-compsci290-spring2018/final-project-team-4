import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pick-group',
  templateUrl: './pick-group.component.html',
  styleUrls: ['./pick-group.component.css']
})
export class PickGroupComponent implements OnInit {

  groups;
  gotGroups = false;

  constructor(private userService: UserService, private http: Http, private router:Router, private chRef: ChangeDetectorRef) {
    this.http.get('https://kville-scheduler.herokuapp.com/api/get-groups/'+this.userService.getKey())
    .subscribe((post)=>{
      this.groups = post.json();
      this.gotGroups = true;
      this.chRef.detectChanges()
    });
  }

  ngOnInit() {
  }

  toMakeGroup(){
    this.router.navigate(['make-group'])
  }

}
