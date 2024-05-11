import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstant } from '@app/helpers/constants';
import {
  ContactUsComponent,
  ForgotPasswordComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent,
} from './components';

const routes: Routes = [
  {
    path: RouteConstant.LOGIN,
    component: LoginComponent,
  },
  {
    path: RouteConstant.REGISTER,
    component: RegisterComponent,
  },
  {
    path: RouteConstant.CONTACT_US,
    component: ContactUsComponent,
  },
  {
    path: RouteConstant.FORGOT_PASSWORD,
    component: ForgotPasswordComponent,
  },
  {
    path: RouteConstant.RESET_PASSWORD,
    component: ResetPasswordComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
