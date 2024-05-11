import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AupairEditProfileComponent, FamilyEditProfileComponent } from './components';
import { RouteConstant } from '@app/helpers/constants';

const routes: Routes = [
  {
    path: RouteConstant.AUPAIR_EDIT_PROFILE,
    component: AupairEditProfileComponent,
  },
  {
    path: RouteConstant.FAMILY_EDIT_PROFILE,
    component: FamilyEditProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfilesRoutingModule { }
