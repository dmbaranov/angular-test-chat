import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersService } from '@services/users.service';
import { IUser } from '@models/user.model';
import { switchMap, map, tap } from 'rxjs/operators';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  username: string;
  usersOnline: IUser[] = [];
  currentUser: IUser;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.usersService
      .getAllUsers()
      .pipe(map(users => Object.values(users)))
      .subscribe((usersOnline: IUser[]) => (this.usersOnline = usersOnline));

    this.usersService.getCurrentUser().subscribe((user: IUser) => (this.currentUser = user));
  }

  makeLogin(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
      data: { username: this.username }
    });

    dialogRef.afterClosed().subscribe((userData: object) => this.usersService.createUser(userData));
  }
}
