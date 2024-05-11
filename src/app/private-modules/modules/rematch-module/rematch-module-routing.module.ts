import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RematchFilterComponent } from '../search-module/components';

const routes: Routes = [
  {
    path: '',
    component: RematchFilterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RematchModuleRoutingModule { }
