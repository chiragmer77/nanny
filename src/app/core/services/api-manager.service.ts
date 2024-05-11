/**
 *
 * Author: Tarang Sachdev.
 * Date: June 01 2022 12:30 AM
 * Copyright @ 2022 Tarang Sachdev
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { SharedService } from './shared.service';
import { HttpHelperService } from './http-helper.service';
import { AppLogger, HttpMethodsTypeEnum } from '@app/helpers';
import { SnackBarService } from './snackbar.service';

@Injectable()
export class APIManager extends HttpHelperService {

  constructor(sharedService: SharedService,
    snackBarService: SnackBarService,
    http: HttpClient) {
    super(sharedService, http,snackBarService);
  }

  // return authorization header
  get Authorized_HttpOptions_JSON() {
    const authToken = this.sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorization header
  get Authorized_HttpOptions() {
    const authToken = this.sharedService.getToken();
    const httpOptions = new HttpHeaders({
      Authorization: `Bearer ${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Json_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with only content-type
  get Content_Type_Form_Url_HttpOptions() {
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return { headers: httpOptions };
  }

  // return authorisation header with content-type as x-www-form-urlencoded
  get Form_URL_Encoded_HttpOptions() {
    const authToken = this.sharedService.getToken();
    const httpOptions = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${authToken}`
    });
    return { headers: httpOptions };
  }

  // return authorisation header with blob
  get Blob_HttpOptions(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      }),
      responseType: 'blob'
    };
  }

  get Blob_HttpOptions_2(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({}),
      responseType: 'blob'
    };
  }

  get File_Upload_HttpOptions(): any {
    const authToken = this.sharedService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      }),
      reportProgress: true,
      responseType: 'json'
    };
  }


  /**
   * method name : overridable httpHelperMethod
   * purpose : handle loader, and call overload in parent class for getting Observable of response
   * created : Sep 24 2018 11:30 AM
   * Revision :
   */
  override httpHelperMethod(methodType: HttpMethodsTypeEnum, url: string, params = {},
    httpOptions = this.Authorized_HttpOptions_JSON,
    showToast: boolean, showLoader: boolean, customMessage = '', searchParams = {}, filesObj?: any[]): Observable<any> | Observable<HttpEvent<any>> {
    if (showLoader) {
      AppLogger(`<=====starting of api call=====> ${url}`);
      this.sharedService.setLoader(true);
    }
    if (methodType === HttpMethodsTypeEnum.POST_MULTIPART || methodType === HttpMethodsTypeEnum.PUT_MULTIPART) {
      params = this.createFormDataObject(params, filesObj);
    }
    return super.httpHelperMethod(methodType, url, params, httpOptions, showToast, showLoader, customMessage, searchParams, filesObj);
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http.get(imageUrl, { responseType: 'blob' });
  }

  // /**
  //  * return formData object from filesObject

  getApis = (url: string, params = {}, loader = true, header = this.Authorized_HttpOptions): Observable<any> => {
    return this.httpHelperMethod(
      HttpMethodsTypeEnum.GET, url, params, header, false, loader);
  }

  postApis = (url: string, params = {}, showToast = true, showLoader = true, header = this.Authorized_HttpOptions): Observable<any> => {
    return this.httpHelperMethod(HttpMethodsTypeEnum.POST, url, params, header, showToast, showLoader);
  }

  postMultiPartApis = (url: string, params = {}, headers: any, fileArray: any, showToast = true, showLoader = true): Observable<any> => {
    return this.httpHelperMethod(
      HttpMethodsTypeEnum.POST_MULTIPART, url, params,
      headers ? headers : this.File_Upload_HttpOptions, showToast, showLoader, '', {}, fileArray);
  }

  postOrPutApis = (url: string, params = {}, methodType: HttpMethodsTypeEnum = HttpMethodsTypeEnum.POST,
    showToast = true, showLoader = true): Observable<any> => {
    return this.httpHelperMethod(methodType, url, params,
      this.Authorized_HttpOptions, showToast, showLoader);
  }

  deleteApis = (url: string, params = {}, showToast = true, showLoader = true): Observable<any> => {
    return this.httpHelperMethod(HttpMethodsTypeEnum.DELETE, url, params,
      this.Authorized_HttpOptions, showToast, showLoader);
  }

  createFormDataObject = (params: any, filesObj: any[] = []) => {
    const formData = new FormData();
    for (const obj of filesObj) {
      const imgFilesObj: File[] = obj.files;
      for (const fileObj of imgFilesObj) {
        formData.append(obj.reqKey, fileObj, fileObj.name);
      }
    }
    if (params && (Object.keys(params).length)) {
      for (const docKey in params) {
        if (typeof params[docKey] === 'object') {
          formData.append(docKey, JSON.stringify(params[docKey]));
        } else {
          formData.append(docKey, params[docKey]);
        }
      }
    }
    return formData;
  };
}
