import { Injectable } from '@angular/core';
import { WebsocketMessage } from '@models/websocket.model';
import * as io from 'socket.io-client';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { switchMapTo } from 'rxjs/operators';

@Injectable()
export class WebsocketService {
  socket: any;

  constructor() {
    this.socket = io.connect('http://localhost:3001');
  }

  subscribeToSocket(msgType: WebsocketMessage): Subject<object | string> {
    const updates$: Subject<object | string> = new Subject<object | string>();
    const socketEvent$: Observable<string> = Observable.fromEvent(this.socket, msgType);

    const subscription = socketEvent$.subscribe(data => {
      updates$.next(data);
      // TODO: uncomment this if you want 'once' behavour
      // subscription.unsubscribe();
    });

    return updates$;
  }

  subscribeToSocketOnce(msgType: WebsocketMessage): Subject<object | string> {
    const updates$: Subject<object | string> = new Subject<object | string>();

    this.socket.once(msgType, data => updates$.next(data));

    return updates$;
  }

  sendMessage(msgType: WebsocketMessage, data?: object | string): any {
    return this.socket.emit(msgType, data);
  }
}
