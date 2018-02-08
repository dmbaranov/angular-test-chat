import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { MessagesService } from './messages.service';
import { UsersService } from './users.service';

@NgModule({
  imports: [HttpClientModule],
  declarations: [],
  providers: [LoggerService, MessagesService, UsersService]
})
export class CoreModule { }
