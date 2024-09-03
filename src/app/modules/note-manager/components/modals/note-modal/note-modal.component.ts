import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesService } from '../../../services/notes.service';
import { Note } from '../../../types/note';
import { TagsService } from '../../../services/tags.service';
import { createUUID } from '../../../../../shared/utils/create-uuid';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteModalComponent implements OnInit {
  noteGroupForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<NoteModalComponent>,
    readonly notesService: NotesService,
    readonly tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA)
    private matDialogData: { note: Note }
  ) {}

  ngOnInit() {
    this.noteGroupForm = this.fb.group({
      title: [null, [Validators.required]],
      content: [null],
      tags: [null],
    });

    if (this.matDialogData) {
      this.noteGroupForm.patchValue(this.matDialogData.note);
    }
  }

  save() {
    if (this.noteGroupForm.invalid) {
      return;
    }

    const newNote = {
      id: createUUID(),
      title: this.noteGroupForm.controls['title'].value,
      tags: this.noteGroupForm.controls['tags'].value,
      content: this.noteGroupForm.controls['content'].value,
    };

    this.notesService.notes = this.matDialogData
      ? this.notesService.notes.map((note) =>
          note.id !== this.matDialogData.note.id ? note : newNote
        )
      : [...this.notesService.notes, newNote];

    this.dialogRef.close();
  }
}
