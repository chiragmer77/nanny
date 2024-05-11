import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RematchModuleRoutingModule } from './rematch-module-routing.module';
import { UtilityModule } from '@app/utility/utility.module';
import { SearchService } from '../search-module/services';

@NgModule({
  declarations: [],
  imports: [CommonModule, UtilityModule, RematchModuleRoutingModule],
  providers: [SearchService],
})
export class RematchModuleModule { }
