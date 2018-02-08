import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BlockComponent } from './block/block.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [BlockComponent],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, BlockComponent]
})
export class SharedModule {}
