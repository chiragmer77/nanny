import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RouteConstant } from "@app/helpers/constants";
import {
  AupairViewProfileComponent,
  FamilyViewProfileComponent,
  PublicProfileContainerComponent
} from "./components";
import { AppAuthGuard } from '@app/utility/_guards';

const routes: Routes = [
  {
    path: RouteConstant.AUPAIR_VIEW_PROFILE,
    canActivate: [AppAuthGuard],
    component: AupairViewProfileComponent,
  },
  {
    path: RouteConstant.FAMILY_VIEW_PROFILE,
    canActivate: [AppAuthGuard],
    component: FamilyViewProfileComponent,
  },
  {
    path: ':userName',
    component: PublicProfileContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewProfilesRoutingModule {}
