import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteAupairRegistrationComponent, CompleteFamilyRegistrationComponent } from './components';
import { RouteConstant } from '@app/helpers/constants';

const routes: Routes = [
  {
    path: RouteConstant.COMPLETE_AUPAIR_REGISTRATION,
    component: CompleteAupairRegistrationComponent,
  },
  {
    path: RouteConstant.COMPLETE_FAMILY_REGISTRATION,
    component: CompleteFamilyRegistrationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteRegistrationRoutingModule { }
