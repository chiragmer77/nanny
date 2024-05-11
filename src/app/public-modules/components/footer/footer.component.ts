import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  //page event
  onHome() {
    this.router.navigate([`/${''}`]);
  }

  get contactUrl() {
    return `/${RouteConstant.CONTACT_US_ROUTE}`;
  }

  get familyUrl() {
    return `/${RouteConstant.FOR_FAMILY_ROUTE}`;
  }

  get aupairCountryUrl() {
    return `/${RouteConstant.AUPAIR_COUNTRY_ROUTE}`;
  }

  get termsUrl() {
    return `/${RouteConstant.TERMS_DETAIL_ROUTE}`;
  }
}
