import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteRegistrationRoutingModule } from './complete-registration-routing.module';
import { completeRegistrationComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { RegistrationService } from './components/services';

@NgModule({
  declarations: [...completeRegistrationComponents],
  imports: [CommonModule, UtilityModule, CompleteRegistrationRoutingModule],
  providers:[RegistrationService]
})
export class CompleteRegistrationModule {}
