import { Component, OnInit } from '@angular/core';
import { MessagesService } from '@services/messages.service';
import { IMessage } from '@models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: IMessage[] = [];

  constructor(private messageService: MessagesService) {}

  ngOnInit() {
    this.messageService
      .getMessages()
      .subscribe((messages: IMessage[]) => (this.messages = messages));
  }

  sendMessage(msg: string) {
    this.messageService.sendMessage({
      text: msg
    });
  }
}
