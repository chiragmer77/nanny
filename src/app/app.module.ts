import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { UtilityModule } from './utility/utility.module';
import { HeaderComponent } from './public-modules/components/header/header.component';
import { FooterComponent } from './public-modules/components/footer/footer.component';
import { HomeComponent } from './public-modules/components/home/home.component';
import { CoreModule } from './core';
import { ToastrModule } from 'ngx-toastr';
import { appInitializer } from './public-modules/modules/auth-module/services/app.initializer';
import { AccountService } from './public-modules/modules/auth-module/services/account.service';
// import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// import {
//   GoogleLoginProvider,
//   FacebookLoginProvider
// } from '@abacritt/angularx-social-login';
import { environment } from '@env/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    UtilityModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AccountService] },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           environment.googleClientId,
    //           {
    //             oneTapEnabled:false,
    //           }
    //         )
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
