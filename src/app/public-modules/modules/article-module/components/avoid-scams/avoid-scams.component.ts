import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avoid-scams',
  templateUrl: './avoid-scams.component.html',
  styleUrls: ['./avoid-scams.component.scss']
})
export class AvoidScamsComponent implements OnInit {

  constructor(public router: Router) { }
  ngOnInit(): void {
  }


}
