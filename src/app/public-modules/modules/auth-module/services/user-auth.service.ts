import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpMethodsTypeEnum, API, } from '@app/helpers';
import { APIManager, CommonService, SharedService } from '@app/core';

@Injectable()
export class UserAuthService {

  constructor(private apiManager: APIManager,
    private sharedService: SharedService) {
  }

  registerUser = (params: any): Observable<any> => {
    return this.apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, API.REGISTER, params,
      this.apiManager.Content_Type_Json_HttpOptions, true, true);
  };

  logIn = (params: any): Observable<any> => {
    return this.apiManager.httpHelperMethod(
      HttpMethodsTypeEnum.POST, API.LOGIN, params,
      this.apiManager.Content_Type_Json_HttpOptions, false, true);
  };

  handleAuthResponse = (response: any) => {
    this.sharedService.handleAuthResponse(response);
  };

  handleRegisterResponse = (response: any) => {
    this.sharedService.handleRegisterResponse(response);
  };
}
