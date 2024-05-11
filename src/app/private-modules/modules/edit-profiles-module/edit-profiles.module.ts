import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProfilesRoutingModule } from './edit-profiles-routing.module';
import { editProfilesComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { EditProfileService } from './services';

@NgModule({
  declarations: [...editProfilesComponents],
  imports: [CommonModule, UtilityModule, EditProfilesRoutingModule],
  providers: [EditProfileService]
})
export class EditProfilesModule { }
