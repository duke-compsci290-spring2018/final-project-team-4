import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() question: string;
  @Input() answer: any;
  @Input() options: any[];
  @Output() correct: EventEmitter<boolean> = new EventEmitter<boolean>();

  selected;
  answered = false;
  tried = false;

  checkAnswer(){
    if(typeof(this.selected) ==='string'){
      this.selected = this.selected.trim();
      this.selected = this.selected.toLowerCase();
    }
    this.answered = this.selected === this.answer;
    this.tried = true;
    this.correct.emit(this.answered);
  }

}
