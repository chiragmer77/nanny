import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material';
import { utilityPipes } from './pipes/pipe-export';
import { utilityComponents } from './components/component-export';
import { utilityDirectives } from './directives/directive-export';
import { ImageViewSliderComponent } from './components/image-view-slider/image-view-slider.component';
import { AppAuthGuard } from './_guards';
import { ChatService } from '@app/private-modules/modules/chat-module/services';
import { MatDialogModule } from '@angular/material/dialog';
import { DurationFormatPipe } from './pipes/duration-format.pipe';
import { LinkifyPipe } from './pipes/linkify.pipe';

@NgModule({
  declarations: [
    ...utilityComponents,
    ...utilityPipes,
    ...utilityDirectives,
    ImageViewSliderComponent,
    DurationFormatPipe,
    LinkifyPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    ...utilityComponents,
    ...utilityPipes,
    utilityDirectives,
    FormsModule,
    MaterialModule,
    TranslateModule,
    HttpClientModule,
    ReactiveFormsModule,
    DurationFormatPipe,
    LinkifyPipe
  ],
  providers: [AppAuthGuard, ChatService],
})
export class UtilityModule {}
