import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, API, } from '@app/helpers';
import { APIManager, SharedService } from '@app/core';

@Injectable()
export class RegistrationService {

  constructor(private apiManager: APIManager,
    private sharedService: SharedService) {
  }

  createAupair = (params: any): Observable<any> => {
    return this.apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, API.ADD_AUPAIR, params,
      this.apiManager.Authorized_HttpOptions_JSON, false, true);
  }

  createFamily = (params: any): Observable<any> => {
    return this.apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, API.ADD_FAMILY, params,
      this.apiManager.Authorized_HttpOptions_JSON, false, true);
  }

  updateAupairProfile = (params: any): Observable<any> => {
    const url = `${API.AUPAIR}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.PUT);
  };

  updateFamilyProfile = (params: any): Observable<any> => {
    const url = `${API.FAMILY}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.PUT);
  };
}
