import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatContainerComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ChatContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
