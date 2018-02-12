import { Injectable } from '@angular/core';
import { IMessage } from '@models/message.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { UsersService } from './users.service';
import { WebsocketService } from './websocket.service';

const testMessages: IMessage[] = [
  {
    id: 'qwe1',
    from: 'from1',
    text: 'text1',
    authorIsAdmin: true
  },
  {
    id: 'qwe2',
    from: 'from2',
    text: 'text2',
    authorIsAdmin: false
  }
];

@Injectable()
export class MessagesService {
  private _messagesList: IMessage[] = testMessages;
  messages$: BehaviorSubject<IMessage[]> = new BehaviorSubject(this._messagesList);

  constructor(private userService: UsersService, private websocket: WebsocketService) {
    // websocket.subscribeToSocket('messages').subscribe((message: IMessage) => {
    //   this._messagesList.push(message);
    //   this.messages$.next(this._messagesList);
    // });
    // this.websocket.subscribeToSocket('messages').subscribe(data => {
    //   console.log('Received websocket data', data);
    // });
  }

  sendMessage(msg: IMessage): void {
    let currentUser;
    this.userService.getCurrentUser().subscribe(user => {
      currentUser = user;
      console.log(currentUser, msg);
    });
    this._messagesList.push(msg);
    this.messages$.next(this._messagesList);
  }

  getMessages(): Observable<IMessage[]> {
    return this.messages$;
  }
}
