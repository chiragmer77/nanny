import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { UtilityModule } from '@app/utility/utility.module';
import { chatDetailsComponents } from './components/components.export';
import { SignalRService } from './services/SignalR.service';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
@NgModule({
  declarations: [...chatDetailsComponents],
  imports: [CommonModule, UtilityModule,NgxEmojiPickerModule, ChatRoutingModule],
  providers: [SignalRService]
})

export class ChatModule {}
