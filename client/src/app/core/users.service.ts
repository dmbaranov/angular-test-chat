import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { IUser } from '@models/user.model';
import { WebsocketMessage } from '@models/websocket.model';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

@Injectable()
export class UsersService {
  user$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  usersOnline$: Subject<IUser[]> = new Subject<IUser[]>();

  constructor(private http: HttpClient, private websocketService: WebsocketService) {}

  getAllUsers(): Observable<IUser[]> {
    // TODO: possible situation when list comes back before subscription is active... Fix with _getAllUser and return Subject
    this.websocketService.sendMessage('users');

    return this.websocketService
      .subscribeToSocket('users')
      .pipe(map((usersList: object) => <IUser[]>Object.values(usersList)));
  }

  createUser(userData: object): void {
    const subMessage: WebsocketMessage = 'users/create';

    this.websocketService
      .subscribeToSocketOnce(subMessage)
      .subscribe((newUser: IUser) => this.user$.next(newUser));

    this.websocketService.sendMessage('users/create', userData);
  }

  getCurrentUser(): Subject<IUser> {
    return this.user$;
  }

  userLeaves(uid: string): void {
    this.websocketService.sendMessage('users/exit', uid);
  }
}
