import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UsersComponent } from './users.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  imports: [SharedModule],
  declarations: [UsersComponent, LoginDialogComponent, UsersListComponent],
  exports: [UsersComponent],
  entryComponents: [LoginDialogComponent]
})
export class UsersModule {}
