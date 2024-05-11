import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonService, SharedService } from '@app/core';
import {
  RouteConstant,
  UserTypeEnum,
  defaultLanguage,
  translationLanguagesWithTitle,
} from '@app/helpers/constants';
import { FormControl } from '@angular/forms';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  userDetail!: any;
  userDetailSub$!: Subscription;
  languageFormCtrl: FormControl = new FormControl('');
  languageList = translationLanguagesWithTitle;
  private changeLanguageSubscriber$!: Subscription;
  mediaQuery = window.matchMedia('(max-width: 767px)');
  isMediaQueryMobile = true;

  constructor(
    public router: Router,
    private translate: TranslateService,
    private commonService: CommonService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.userSubscriber();
    if (this.mediaQuery.matches) {
      this.isMediaQueryMobile = false;
    }
  }

  ngOnDestroy(): void {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
  }
chatClick(){
  localStorage.removeItem('selectedUser');
  let user = this.sharedService.getUser();
  if(user){
    user.unreadCount=0;
    this.sharedService.setUser(user);
  }
   
}
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail?.language) {
          this.languageFormCtrl.setValue(this.userDetail.language);
        } else {
          const browserLang: string = this.translate.getBrowserLang() || '';
          const lang = browserLang.match(/en|nl/)
            ? browserLang
            : defaultLanguage;
          this.languageFormCtrl.setValue(lang);
        }
      });
  };

  onChangeLanguage = (event: any) => {
    const lang = event.value;
    if (this.userDetail) {
      this.changeLanguage(lang);
    } else {
      this.useTranslate(lang);
    }
  };

  useTranslate = (language: string) => {
    this.translate.use(language);
  };

  changeLanguage = (language: string) => {
    if (this.changeLanguageSubscriber$) {
      this.changeLanguageSubscriber$.unsubscribe();
    }
    this.changeLanguageSubscriber$ = this.changeUserLanguageService({
      language,
    }).subscribe({
      next: (res: any) => {
        this.handleLanguageChange(res);
      },
      error: (e) => {},
    });
  };

  handleLanguageChange = (res: any) => {
    this.sharedService.handleLanguageChangeResponse(res);
  };

  changeUserLanguageService = (params: any): Observable<any> => {
    return this.commonService.setUserLanguage(params);
  };

  //page event
  onLogin() {
    this.router.navigate([`/${RouteConstant.LOGIN_ROUTE}`]);
  }

  onHome() {
    this.router.navigate(['/']);
  }

  onRegister() {
    this.router.navigate([`/${RouteConstant.REGISTER_ROUTE}`]);
  }

  onLogout() {
    this.sharedService.logout();
    this.router.navigate([`/${RouteConstant.LOGIN_ROUTE}`]);
  }

  get isLoggedIn() {
    return this.sharedService.isLoggedIn();
  }

  get searchUrl() {
    return `/${RouteConstant.SEARCH}`;
  }

  get chatUrl() {
    return `/${RouteConstant.CHAT}`;
  }

  get familyUrl() {
    return `/${RouteConstant.FOR_FAMILY}`;
  }

  get aupairCountryUrl() {
    return `/${RouteConstant.AUPAIR_COUNTRY}`;
  }

  get avoidScamsUrl() {
    return `/${RouteConstant.AUPAIR_AVOIDSCAMS}`;
  }
  
  onViewProfile() {
    const url =
      this.userDetail?.userType === UserTypeEnum.FAMILY
        ? RouteConstant.FAMILY_VIEW_PROFILE_ROUTE
        : RouteConstant.AUPAIR_VIEW_PROFILE_ROUTE;
    this.router.navigate([`/${url}`]);
  }

  onHomePage() {
    const url =
      this.userDetail?.userType === UserTypeEnum.FAMILY
        ? RouteConstant.FAMILY_WELCOME_PROFILE_ROUTE
        : RouteConstant.AUPAIR_WELCOME_PROFILE_ROUTE;
    this.router.navigate([`/${url}`]);
  }
}
