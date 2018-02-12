import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { MessagesService } from './messages.service';
import { UsersService } from './users.service';
import { WebsocketService } from './websocket.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [LoggerService, WebsocketService, MessagesService, UsersService]
})
export class CoreModule {}
