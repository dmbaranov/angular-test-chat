import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { IUser } from '@models/user.model';
import { Observable, Subject } from 'rxjs';
import { map, combineLatest, switchMap, concatMap } from 'rxjs/operators';

@Injectable()
export class UsersService {
  user$: Subject<IUser> = new Subject<IUser>();

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<object> {
    return this.http.get('/api/users');
  }

  createUser(userData: object): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http
      .post('/api/users/create', { userData }, httpOptions)
      .subscribe((newUser: IUser) => this.user$.next(newUser));
  }

  getCurrentUser(): Subject<IUser> {
    return this.user$;
  }
}
