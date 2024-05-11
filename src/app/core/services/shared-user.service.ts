import { Injectable } from '@angular/core';
import { APPStorage } from '@app/helpers/constants';
import { EncryptionFunctions } from '@app/helpers/functions';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedUserService {
  private userFlag: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private publicLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() { }

  private _user: any | null;

  getUser(): any | null {
    if (!this._user && localStorage.getItem(APPStorage.USER)) {
      this._user = JSON.parse(EncryptionFunctions.decrypt_cipher(
        localStorage.getItem(APPStorage.USER)
      ));
    }
    return this._user;
  }

  setUser(value: any | null): void {
    localStorage.setItem(
      APPStorage.USER,
      EncryptionFunctions.encrypt_cipher(JSON.stringify(value))
    );
    this._user = value;
    this.setUserDetailCall(true);
  }

  isValidUser(user: any): boolean {
    return !!user;
  }

  /* Shared User detailChangeFlag for update status */

  setUserDetailCall(value: boolean): void {
    this.userFlag.next(value);
  }

  getUserDetailCall(): Observable<boolean> {
    return this.userFlag.asObservable();
  }

  /* Shared language change for public screen update status */
  setLanguageCall(value: string): void {
    this.publicLanguage.next(value);
  }

  getLanguageCall(): Observable<string> {
    return this.publicLanguage.asObservable();
  }

  get isAdmin() {
    return this._user?.isAdmin;
  }

  get isManager() {
    return this._user?.isManager;
  }

}
