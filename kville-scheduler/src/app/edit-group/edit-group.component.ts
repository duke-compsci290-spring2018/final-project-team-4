import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  members = [];
  newMembers = []

  constructor(private http: Http, private userService: UserService, private router: Router, private routes: ActivatedRoute) {
    this.http.get('/api/get-members/' + this.routes.snapshot.params['group'])
    .subscribe((post)=>{
      if(!post.ok) console.log(post);
      this.members = post.json();
      this.newMembers = post.json();
    });
  }

  ngOnInit() {
  }


  submit(){
    this.http.post('/api/edit-group', {group: '-LBEax8hyLCpfa_FHIRA', newMembers: this.newMembers}).
    subscribe((post) =>{
      if(!post.ok) console.log(post);
      this.router.navigate(['pick-group']);
    });
  }

}
