import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aupair-interview-questions',
  templateUrl: './aupair-interview-questions.component.html',
  styleUrls: ['./aupair-interview-questions.component.scss']
})
export class InterviewQuestionsComponent implements OnInit {

  //constructor(public router: Router) { }

  // ngOnInit(): void {
  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //         return;
  //     }
  //     window.scrollTo(0, 0)
  // });
  // }

  constructor(
    public router: Router
  ){}
  
  ngOnInit(): void {
  }
}
