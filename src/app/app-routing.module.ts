import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactUsComponent, HomeComponent } from "./public-modules/components";
import { RouteConstant } from "./helpers/constants";
import { AppAuthGuard } from './utility/_guards';
import { AupairCountryComponent, AvoidScamsComponent, ForFamilyComponent, InterviewQuestionsComponent } from "./public-modules/modules/article-module/components";
import { EmailVerificationComponent } from "./public-modules/components/email-verification/email-verification.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: RouteConstant.AUTH,
    //canActivate: [AppAuthGuard],
    loadChildren: () =>
      import("./public-modules/modules/auth-module/auth.module").then(
        (m) => m.AuthModule
      ),
  },
  {
    path: RouteConstant.AUPAIR_AVOIDSCAMS,
    component: AvoidScamsComponent
  },
  {
    path: RouteConstant.ARTICLE,
    loadChildren: () =>
      import("./public-modules/modules/article-module/article.module").then(
        (m) => m.ArticleModule
      ),
  },
  {
    path: RouteConstant.SEARCH,
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import("./private-modules/modules/search-module/search.module").then(
        (m) => m.SearchModule
      ),
  },
  {
    path: RouteConstant.COMPLETE_REGISTRATION,
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import(
        "./private-modules/modules/complete-registration-module/complete-registration.module"
      ).then((m) => m.CompleteRegistrationModule),
  },
  {
    path: RouteConstant.EDIT_PROFILE,
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import(
        "./private-modules/modules/edit-profiles-module/edit-profiles.module"
      ).then((m) => m.EditProfilesModule),
  },
  {
    path: RouteConstant.VIEW_PROFILE,
    loadChildren: () =>
      import(
        "./private-modules/modules/view-profiles-module/view-profiles.module"
      ).then((m) => m.ViewProfilesModule),
  },
  {
    path: RouteConstant.WELCOME_PROFILE,
    loadChildren: () =>
      import(
        "./private-modules/modules/welcome-profiles-module/welcome-profiles.module"
      ).then((m) => m.WelcomeProfilesModule),
  },
  {
    path: RouteConstant.CHAT,
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import("./private-modules/modules/chat-module/chat.module").then(
        (m) => m.ChatModule
      ),
  },
  {
    path: RouteConstant.REMATCH,
    canActivate: [AppAuthGuard],
    loadChildren: () =>
      import("./private-modules/modules/rematch-module/rematch-module.module").then(
        (m) => m.RematchModuleModule
      ),
  },
  {
    path: RouteConstant.CONTACT_US,
    component: ContactUsComponent
  },
  {
    path: RouteConstant.EMAIL_VERIFY_ROUTE,
    component: EmailVerificationComponent
  },
  {
    path: RouteConstant.AUPAIR_COUNTRY,
    component: AupairCountryComponent
  },
  {
    path: RouteConstant.AUPAIR_INTERVIEWQUESTIONS,
    component: InterviewQuestionsComponent
  },
  {
    path: RouteConstant.FOR_FAMILY,
    component: ForFamilyComponent
  },
  {
    path: '**',
    component: HomeComponent,
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
