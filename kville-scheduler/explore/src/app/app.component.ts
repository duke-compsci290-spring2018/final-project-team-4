import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  picked = false;
  quizzes;
  quiz;
  total = 0;
  unanswered = [];
  selected = 0;

  constructor(private http:Http){
    this.http.get('assets/quizzes.json')
                  .subscribe(res => this.quizzes = res.json());
  }

  select(quiz:string){
    this.quiz = this.quizzes[quiz];
    this.picked = true;
    this.unanswered.length = this.quiz.questions.length;
    this.quiz.questions.forEach((q, index) =>{
      this.unanswered[index] = index;
    });
  }

  add(answer:boolean){
    if(answer){
      this.total += 1;
      this.unanswered.splice(this.selected, 1);
    }
  }

  nextQuestion(){
    if(this.selected < this.unanswered.length-1){
      this.selected++;
    }
  }

  previousQuestion(){
    if(this.selected > 0){
      this.selected--;
    }
  }

  resetQuiz(){
    this.quiz = "";
    this.picked = false;
    this.unanswered.length = 0;
  }
}
