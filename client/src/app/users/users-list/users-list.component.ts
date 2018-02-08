import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '@models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  @Input() users: IUser[] = [];

  constructor() {}

  ngOnInit() {}
}
