import { Injectable } from '@angular/core';
import { API, HttpMethodsTypeEnum, RouteConstant } from '@app/helpers/constants';
import { Observable, Subscription } from 'rxjs';
import { APIManager } from './api-manager.service';
import {Clipboard} from '@angular/cdk/clipboard';
import { SnackBarService } from './snackbar.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apiManager: APIManager, private clipboard: Clipboard,
    private snackBarService: SnackBarService,
    private translate: TranslateService) {}

  uploadPhotos = (fileArray: any[], params: any): Observable<any> => {
    const url = `${API.PHOTO_UPLOAD}`;
    return this.apiManager.postMultiPartApis(
      url,
      params,
      this.apiManager.File_Upload_HttpOptions,
      fileArray
    );
  };

  getPhotos = (params = {}): Observable<any> => {
    const url = `${API.GET_PHOTOS}`;
    return this.apiManager.getApis(url, params);
  };

  deletePhoto = (params = {}): Observable<any> => {
    const url = `${API.DELETE_PHOTO}`;
    return this.apiManager.deleteApis(url, params);
  };

  getAupairById = (params: any): Observable<any> => {
    const url = `${API.AUPAIR_BY_ID}`;
    return this.apiManager.getApis(url, params);
  };

  getFamilyById = (params: any): Observable<any> => {
    const url = `${API.FAMILY_BY_ID}`;
    return this.apiManager.getApis(url, params);
  };

  getAupairProfile = (): Observable<any> => {
    return this.apiManager.getApis(`${API.AUPAIR}`);
  };

  getFamilyProfile = (): Observable<any> => {
    return this.apiManager.getApis(`${API.FAMILY}`);
  };

  getFamilyWelcomePage = (): Observable<any> => {
    return this.apiManager.getApis(`${API.FAMILY_WELCOME}`);
  };

  getUserByProfileNumber = (params: any): Observable<any> => {
    return this.apiManager.postApis(
      `${API.USER_BY_PROFILE_NUMBER}`,
      params,
      true
    );
  };

  getHomePage = (): Observable<any> => {
    return this.apiManager.getApis(`${API.GET_HOME_PAGE}`, {}, true);
  };

  setUserLanguage = (params = {}): Observable<any> => {
    const url = API.SET_USER_LANGUAGE;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.PUT);
  };

  addFavorite = (params: any = {}): Observable<any> => {
    return this.apiManager.postApis(`${API.ADD_FAVORITE}`, params, true);
  };

  removeFavorite = (params: any): Observable<any> => {
    return this.apiManager.postOrPutApis(
      `${API.REMOVE_FAVORITE}`,
      params,
      HttpMethodsTypeEnum.PUT,
      true
    );
  };

  contactUsApi = (params: any): Observable<any> => {
    return this.apiManager.postApis(`${API.ADD_CONTACT}`, params, true);
  };

  copyProfileUrl(userDetail: any):string {
    if(userDetail){
     // const profileUrl = `${window.location.origin}/${RouteConstant.VIEW_PROFILE}/${profileNumber}`;
     const profileUrl = `https://nannyaupair.com/${RouteConstant.VIEW_PROFILE}/${userDetail}`;
       return profileUrl;
    }
    return "";
  }
  getUnreadMessageCount = (): Observable<any> => {
    const url = `${API.GET_CHAT_MESSAGES_UNREAD_COUNT}`;
    return this.apiManager.getApis(url, {}); 
  };
  verifyEmail = (params: any = {}): Observable<any> => {
    return this.apiManager.postApis(`${API.EMAIL_CONFIRMATION}`,params, false);
  };
}
