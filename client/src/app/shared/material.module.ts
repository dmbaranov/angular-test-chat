import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatFormFieldModule],
  exports: [MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatFormFieldModule]
})
export class MaterialModule {}
