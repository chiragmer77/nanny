import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { searchComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { SearchService } from './services';

@NgModule({
  declarations: [...searchComponents],
  imports: [CommonModule, UtilityModule, SearchRoutingModule],
  providers: [SearchService],
})
export class SearchModule {}
