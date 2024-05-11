import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonService, SharedService, SnackBarService } from './core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { defaultLanguage, translationLanguages } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'nanny-aupair-frontend';
  isLoading = false;
  userDetail: any;
  private loaderSubscriber$!: Subscription;
  private languageSub$!: Subscription;
  private userDetailSub$!: Subscription;

  constructor(
    private snackBarService: SnackBarService,
    private translate: TranslateService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.subscribeIsLoading();
    this.snackBarService.initSnackBar();
    if (this.sharedService.isLoggedIn()) {
      this.bindLoggedInUser();
    }
    this.translate.addLangs(translationLanguages);
    this.translationLanguageSet();
    let user = this.sharedService.getUser();
    if (user) {
      this.commonService.getUnreadMessageCount().subscribe({
        next: (res) => {
          if (res.payload != null) {
            user.unreadCount = res.payload.unreadCount;
            this.sharedService.setUser(user);
          }
        },
        error: (e) => { },
      });
    }
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.loaderSubscriber$) {
      this.loaderSubscriber$.unsubscribe();
    }
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    if (this.languageSub$) {
      this.languageSub$.unsubscribe();
    }
  }

  translationLanguageSet = () => {
    if (this.sharedService.isLoggedIn()) {
      this.changeUserLanguage();
    } else {
      this.changePublicLanguage();
    }
  };

  changeUserLanguage = () => {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        const browserLang: string =
          this.translate.getBrowserLang() || defaultLanguage;
        const language =
          this.userDetail?.language ||
          (translationLanguages.indexOf(browserLang) > -1
            ? browserLang
            : defaultLanguage);
        this.useTranslate(language.toLowerCase());
      });
  };

  changePublicLanguage = () => {
    if (this.languageSub$) {
      this.languageSub$.unsubscribe();
    }
    this.languageSub$ = this.sharedService
      .getLanguageCall()
      .subscribe((value) => {
        const browserLang: string =
          this.translate.getBrowserLang() || defaultLanguage;
        const language =
          translationLanguages.indexOf(value) > -1 ? value : browserLang;
        this.useTranslate(language.toLowerCase());
      });
  };

  useTranslate = (language: string) => {
    this.translate.use(language.match(/en|nl/) ? language : defaultLanguage);
  };

  bindLoggedInUser = () => {
    // console.log(this.userDetail);
    // this.commonService.getUserProfile().subscribe({
    //   next: (res) => this.handleProfileData(res),
    //   error: (e) => console.error(e),
    // });
  };

  subscribeIsLoading() {
    this.loaderSubscriber$ = this.sharedService
      .getLoader()
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }
}
