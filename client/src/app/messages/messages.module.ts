import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MessagesService } from '@services/messages.service';
import { MessagesComponent } from './messages.component';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@NgModule({
  imports: [SharedModule],
  declarations: [MessagesComponent, MessagesListComponent, NewMessageComponent],
  providers: [MessagesService],
  exports: [MessagesComponent]
})
export class MessagesModule {}
