import { Injectable } from '@angular/core';
import { IMessage } from '@models/message.model';
import { IUser } from '@models/user.model';
import { UsersService } from '@services/users.service';
import { WebsocketService } from '@services/websocket.service';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map, filter, takeWhile } from 'rxjs/operators';

@Injectable()
export class MessagesService {
  private _messagesList: IMessage[] = [];
  private _currentUser: IUser;
  messages$: BehaviorSubject<IMessage[]> = new BehaviorSubject(this._messagesList);

  constructor(private userService: UsersService, private websocketService: WebsocketService) {}

  _getCurrentUser(): Observable<any> {
    if (this._currentUser) {
      return Observable.of(null);
    }

    return Observable.create(() => {
      this.userService.getCurrentUser().subscribe(user => {
        console.log('User received');
        this._currentUser = user;
      });
    });
  }

  sendMessage(msg: IMessage): void {
    const createMessage = (user: IUser) => ({
      ...msg,
      from: user
    });

    this.userService
      .getCurrentUser()
      .pipe(
        takeWhile((user: IUser) => user !== null),
        map((user: IUser) => createMessage(user)),
        map((msg: IMessage) => this.websocketService.sendMessage('messages/create', msg))
      )
      .subscribe();

    this.websocketService.subscribeToSocketOnce('messages/create').subscribe((msg: IMessage) => {
      this._messagesList.push(msg);
      this.messages$.next(this._messagesList);
    });
  }

  getMessages(): Subject<string | object> {
    this.websocketService.sendMessage('messages');

    return this.websocketService.subscribeToSocket('messages');
  }
}
