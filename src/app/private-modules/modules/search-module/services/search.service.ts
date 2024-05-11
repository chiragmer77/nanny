import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '@app/helpers';
import { APIManager } from '@app/core';

@Injectable()
export class SearchService {
  constructor(private apiManager: APIManager) {}

  searchAupairs = (params = {}): Observable<any> => {
    return this.apiManager.postApis(`${API.SEARCH_AUPAIR}`, params, false);
  };

  searchFamilies = (params = {}): Observable<any> => {
    return this.apiManager.postApis(`${API.SEARCH_FAMILY}`, params, false);
  };

  rematchAupairs = (params = {}): Observable<any> => {
    return this.apiManager.postApis(`${API.REMATCH}`, params, false);
  };

  getDefaultSearchCriteriaOfAupair = (): Observable<any> => {
    return this.apiManager.getApis(`${API.CRITERIA_SEARCH_OF_AUPAIR}`);
  };

  getDefaultSearchCriteriaOfFamily = (): Observable<any> => {
    return this.apiManager.getApis(`${API.CRITERIA_SEARCH_OF_FAMILY}`);
  };

  getFavoriteFamily = (): Observable<any> => {
    return this.apiManager.postApis(`${API.FAVORITE_FAMILY}`, {}, false);
  };

  getFavoriteAupair = (): Observable<any> => {
    return this.apiManager.postApis(`${API.FAVORITE_AUPAIR}`, {}, false);
  };
}
