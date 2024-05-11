import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedUserService } from './shared-user.service';
import {
  APPStorage,
  EncryptionFunctions,
  RouteConstant,
  UserTypeEnum,
} from '@app/helpers';
@Injectable()
export class SharedService extends SharedUserService {
  helper = new JwtHelperService();
  private taskCount = 0;
  private _token = '';
  private snackBarMessageBody: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private isLoginRequired: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    super();
  }

  /* Shared Loader Param */

  getLoader(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  setToken(value: string): void {
    this._token = value;
    localStorage.setItem(
      APPStorage.TOKEN,
      EncryptionFunctions.encrypt_cipher(value)
    );
  }

  getToken(): string {
    this._token = EncryptionFunctions.decrypt_cipher(
      localStorage.getItem(APPStorage.TOKEN)
    );
    return this._token;
  }

  /* Shared User Token Param */
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUser();
  }

  encryptFields(object: any, fields: string[]): any {
    const encryptedObject = { ...object }; 
    fields.forEach(field => {
      if (encryptedObject.hasOwnProperty(field)) {
        encryptedObject[field] = EncryptionFunctions.encrypt_cipher(encryptedObject[field]);
      }
    });

    return encryptedObject;
  }

  encryptValue(value:any):string {
    return EncryptionFunctions.encrypt_cipher(value);
  }

  decryptValue(value:any): string {
    return EncryptionFunctions.decrypt_cipher(value);
  }

  setLoader(val: boolean): void {
    if (val) {
      this.taskCount += 1;
    } else {
      this.taskCount -= 1;
      if (this.taskCount !== 0) {
        val = true;
      }
    }
    this.isLoading.next(val);
  }

  getSnackMessage(): Observable<any> {
    return this.snackBarMessageBody.asObservable();
  }

  clearSession() {
    this.setToken('');
    this.setUser(null);
    this.setLoginRequired(false);
    localStorage.clear();
  }

  logout(isRedirectToLogin = true): void {
    this.clearSession();
    if (isRedirectToLogin && this.router.url !== `/${RouteConstant.LOGIN_ROUTE}`) {
      this.router.navigate([`/${RouteConstant.LOGIN_ROUTE}`]);
    }
    // this._router.navigate([`/${RouteConstant.AUTH_LOGIN}`]);
  }

  /* Shared LoggedIn Param */

  getLoginRequired(): Observable<boolean> {
    return this.isLoginRequired.asObservable();
  }

  setLoginRequired(val: boolean): void {
    this.isLoginRequired.next(val);
  }

  handleRegisterResponse = (response: any) => {
    const { user, token } = response.payload;
    this.setToken(token);
    user.unreadCount=0;
    this.setUser(user);
    if (user.userType === UserTypeEnum.AU_PAIR) {
      this.router.navigate([
        `/${RouteConstant.COMPLETE_AUPAIR_REGISTRATION_ROUTE}`,
      ]);
    } else if (user.userType === UserTypeEnum.FAMILY) {
      this.router.navigate([
        `/${RouteConstant.COMPLETE_FAMILY_REGISTRATION_ROUTE}`,
      ]);
    }
  };

  handleAuthResponse = (response: any) => {
    const { user, token } = response.payload;
    if (token) {
      this.setToken(token);
    }
    if (user) {
      this.setUser({ ...user });
    }
  };

  handleLanguageChangeResponse = (response: any) => {
    const { user, token } = response.payload;
    const userDetail = this.getUser();
    if (token) {
      this.setToken(token);
    }
    if (user) {
      this.setUser({ ...userDetail, ...user });
    }
  };
}
