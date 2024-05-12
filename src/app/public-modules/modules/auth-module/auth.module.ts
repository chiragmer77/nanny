import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { authComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { UserAuthService } from './services';
import { GoogleSigninModule } from './components/google-signin-module';
import { GoogleSigninButtonModule } from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [...authComponents],
  providers: [UserAuthService],
  imports: [CommonModule, UtilityModule, AuthRoutingModule,GoogleSigninModule,GoogleSigninButtonModule],
})
export class AuthModule { }
