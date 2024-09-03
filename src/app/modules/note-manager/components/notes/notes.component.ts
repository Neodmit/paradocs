import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteModalComponent } from '../modals/note-modal/note-modal.component';
import { NotesService } from '../../services/notes.service';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { notesTableFields } from '../../constants/notes-table-fields';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent {
  readonly dialog = inject(MatDialog);

  dataSource$ = this.notesService.notes$.pipe(
    map((data) => new MatTableDataSource(data))
  );

  protected readonly notesTableFields = notesTableFields;

  constructor(private readonly notesService: NotesService) {}

  addNote() {
    this.dialog.open(NoteModalComponent, {
      height: '400px',
      width: '600px',
    });
  }

  editNote(editNoteId: string) {
    this.dialog.open(NoteModalComponent, {
      height: '400px',
      width: '600px',
      data: {
        note: this.notesService.notes.find((note) => note.id === editNoteId),
      },
    });
  }

  deleteNote(deletedNoteId: string) {
    this.notesService.notes = this.notesService.notes.filter(
      (note) => note.id !== deletedNoteId
    );
  }
}
