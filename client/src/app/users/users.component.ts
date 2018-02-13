import { Component, OnInit, HostListener } from '@angular/core';
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
  formUsername: string;
  usersOnline: IUser[] = [];
  currentUser: IUser;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit() {
    this.usersService.getAllUsers().subscribe((users: IUser[]) => (this.usersOnline = users));

    this.usersService.getCurrentUser().subscribe((user: IUser) => {
      this.currentUser = user;
    });
  }

  makeLogin(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe((userData: object) => {
      if (userData) {
        this.usersService.createUser(userData);
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  makeLogout() {
    if (this.currentUser) {
      this.usersService.userLeaves(this.currentUser.id);
    }
  }
}
