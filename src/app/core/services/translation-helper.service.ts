import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TranslationHelperService {
  constructor(private translate: TranslateService) {}

  private languageSelection$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  getLanguage(): Observable<any> {
    return this.languageSelection$.asObservable();
  }

  setLanguage(lang: any): void {
    this.languageSelection$.next(lang);
  }

  getTextFromKey = (translateKey: any, params = {}) => {
    return this.translate.instant(translateKey, params);
  };
}
