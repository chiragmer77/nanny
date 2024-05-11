import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpInterceptors } from './http-interceptors/index-Interceptor';
import {
  APIManager,
  CommonService,
  SharedService,
  SharedUserService,
  TranslationHelperService,
} from './services';
import { coreComponents } from './components/component-export';
import { SnackBarService } from './services/snackbar.service';
import { MaterialModule } from '@app/material';
import { IpServiceService } from './services/ip-service.service';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LogService } from './services/log.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  // return new TranslateHttpLoader(http);
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
  ],
  declarations: [...coreComponents],
  providers: [
    LogService,
    HttpInterceptors,
    SharedService,
    SharedUserService,
    IpServiceService,
    SnackBarService,
    TranslationHelperService,
    CommonService,
    APIManager,
  ],
  exports: [...coreComponents, MaterialModule],
  entryComponents: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
