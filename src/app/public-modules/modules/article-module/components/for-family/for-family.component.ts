import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-for-family',
  templateUrl: './for-family.component.html',
  styleUrls: ['./for-family.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      // The '* => *' will trigger the animation to change between any two states
      transition('* => *', [
        // The CSS styles at the start of the animation
        style({ opacity: 0 }),
        // The animation and styles at the end
        animate('1s', style({ opacity: 1 }))
      ]),
    ]),
 

  trigger('bounce', [
    transition(':enter', [
      animate('1s ease-in-out', keyframes([
        style({ transform: 'scale(0.5)', opacity: 0, offset: 0 }),
        style({ transform: 'scale(1.2)', opacity: 0.5, offset: 0.3 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 })
      ]))
    ])
  ])
  
]
})
export class ForFamilyComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
