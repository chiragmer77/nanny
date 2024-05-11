import { EmailVerificationComponent } from '../../../components/email-verification/email-verification.component';
import { AuthRightPartComponent } from './auth-right-part/auth-right-part.component';
import { ContactUsComponent } from '../../../components/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

export const authComponents = [
  LoginComponent,
  RegisterComponent,
  ContactUsComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  AuthRightPartComponent,
  EmailVerificationComponent
];
