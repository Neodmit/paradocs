import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteManagerComponent } from './components/note-manager/note-manager.component';
import { MatTabsModule } from '@angular/material/tabs';
import { NoteManagerRoutingModule } from './note-manager-routing.module';
import { NotesComponent } from './components/notes/notes.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { NoteModalComponent } from './components/modals/note-modal/note-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NotesService } from './services/notes.service';
import { SharedModule } from '../../shared/shared.module';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ReminderModalComponent } from './components/modals/reminder-modal/reminder-modal.component';
import { MatSelectModule } from '@angular/material/select';
import { RemindersService } from './services/reminders.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TagsComponent } from './components/tags/tags.component';
import { TagsService } from './services/tags.service';
import { TagModalComponent } from './components/modals/tag-modal/tag-modal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    NoteManagerComponent,
    NotesComponent,
    NoteModalComponent,
    RemindersComponent,
    ReminderModalComponent,
    TagsComponent,
    TagModalComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    NoteManagerRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NgxMatTimepickerModule,
    MatSnackBarModule,
  ],
  providers: [
    NotesService,
    RemindersService,
    TagsService,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class NoteManagerModule {}
