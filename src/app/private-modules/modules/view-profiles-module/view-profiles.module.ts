import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ViewProfilesRoutingModule } from "./view-profiles-routing.module";
import { viewProfilesComponents } from "./components/components.export";
import { UtilityModule } from "@app/utility/utility.module";

@NgModule({
  declarations: [...viewProfilesComponents],
  imports: [CommonModule, UtilityModule, ViewProfilesRoutingModule],
})
export class ViewProfilesModule {}
