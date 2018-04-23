
import {Injectable} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  handleSignOutClick(event):void {
    gapi.auth2.getAuthInstance().signOut();

  }

}
