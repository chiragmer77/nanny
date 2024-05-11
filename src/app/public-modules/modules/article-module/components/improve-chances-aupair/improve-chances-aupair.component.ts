import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-improve-chances-aupair',
  templateUrl: './improve-chances-aupair.component.html',
  styleUrls: ['./improve-chances-aupair.component.scss']
})
export class ImproveChancesAupairComponent implements OnInit {

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
