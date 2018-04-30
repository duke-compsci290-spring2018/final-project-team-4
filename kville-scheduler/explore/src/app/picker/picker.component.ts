import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() quizzes: any[];
  @Output() selecting: EventEmitter<number> = new EventEmitter<number>();

  selectQuiz(quiz){
    this.selecting.emit(quiz);
  }

}
