import { NgModule } from '@angular/core';
import { TableWithCreationComponent } from './components/table-with-creation/table-with-creation.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ModalLayoutComponent } from './components/modal-layout/modal-layout.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [TableWithCreationComponent, ModalLayoutComponent],
  exports: [TableWithCreationComponent, ModalLayoutComponent],
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
})
export class SharedModule {}
