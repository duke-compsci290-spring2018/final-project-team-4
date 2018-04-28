import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-make-schedule',
  templateUrl: './make-schedule.component.html',
  styleUrls: ['./make-schedule.component.css']
})
export class MakeScheduleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  members = [
    {
      first: "Blake",
      last: "Becerra",
      phone: "918-373-5276"
    },
    {
      first: "Addison",
      last: "Howenstine",
      phone: "123-456-7890"
    },
    {
      first: "Kabe",
      last: "Webster",
      phone: "123-654-7890"
    },
    {
      first: "Rayleigh",
      last: "Palmer",
      phone: "098-765-4321"
    }
  ]


}
