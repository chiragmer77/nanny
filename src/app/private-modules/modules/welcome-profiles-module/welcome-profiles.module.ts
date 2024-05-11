import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomeProfilesRoutingModule } from "./welcome-profiles-routing.module";
import { welcomeProfilesComponents } from "./components/components.export";
import { UtilityModule } from "@app/utility/utility.module";

@NgModule({
  declarations: [...welcomeProfilesComponents],
  imports: [CommonModule, UtilityModule, WelcomeProfilesRoutingModule],
})
export class WelcomeProfilesModule {}
