import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API, HttpMethodsTypeEnum } from '@app/helpers';
import { APIManager } from '@app/core';

@Injectable()
export class EditProfileService {
  constructor(private apiManager: APIManager) {}

  getAupairProfile = (): Observable<any> => {
    return this.apiManager.getApis(`${API.AUPAIR}`);
  };

  getFamilyProfile = (): Observable<any> => {
    return this.apiManager.getApis(`${API.FAMILY}`);
  };

  updateAupairProfile = (params: any): Observable<any> => {
    const url = `${API.AUPAIR}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.PUT);
  };

  updateFamilyProfile = (params: any): Observable<any> => {
    const url = `${API.FAMILY}`;
    return this.apiManager.postOrPutApis(url, params, HttpMethodsTypeEnum.PUT);
  };
}
