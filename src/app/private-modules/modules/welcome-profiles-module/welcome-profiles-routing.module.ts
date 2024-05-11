import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstant } from "@app/helpers/constants";
import {
  AupairWelcomeProfileComponent,
  FamilyWelcomeProfileComponent,
  
} from "./components";
import { AppAuthGuard } from '@app/utility/_guards';

const routes: Routes = [
  {
    path: RouteConstant.AUPAIR_WELCOME_PROFILE,
    canActivate: [AppAuthGuard],
    component: AupairWelcomeProfileComponent,
  },
  {
    path: RouteConstant.FAMILY_WELCOME_PROFILE,
    canActivate: [AppAuthGuard],
    component: FamilyWelcomeProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeProfilesRoutingModule {}
