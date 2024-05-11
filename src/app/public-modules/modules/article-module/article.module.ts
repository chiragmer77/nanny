import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { articleComponents } from './components/components.export';
import { UtilityModule } from '@app/utility/utility.module';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [...articleComponents],
  imports: [CommonModule, UtilityModule, ArticleRoutingModule, MatCardModule],
})
export class ArticleModule {}
