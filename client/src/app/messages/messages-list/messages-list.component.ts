import { Component, OnInit } from '@angular/core';
import { MessagesService } from '@services/messages.service';
import { IMessage } from '@models/message.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit {
  messages: IMessage[] = [];

  constructor(private messagesService: MessagesService) {}

  ngOnInit(): void {
    this.messagesService.getMessages().subscribe(messages => (this.messages = messages));
  }
}
