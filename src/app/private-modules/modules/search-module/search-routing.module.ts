import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RematchFilterComponent, SearchContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: SearchContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
