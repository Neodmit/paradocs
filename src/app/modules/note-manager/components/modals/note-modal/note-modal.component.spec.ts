import { NoteModalComponent } from './note-modal.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SharedModule } from '../../../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotesService } from '../../../services/notes.service';
import { NotesServiceStub } from '../../../../../../tests/stubs/notes.service.stub';
import { TagsService } from '../../../services/tags.service';
import { TagsServiceStub } from '../../../../../../tests/stubs/tags.service.stub';
import { notesMock } from '../../../../../../tests/mocks/notes';
import { MatSelectModule } from '@angular/material/select';
import { Note } from '../../../types/note';

describe('NoteModalComponent', () => {
  let component: NoteModalComponent;
  let fixture: ComponentFixture<NoteModalComponent>;

  let dialogRef: MatDialogRef<unknown>;
  let notesService: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoteModalComponent],
      imports: [
        SharedModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatSelectModule,
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
        { provide: TagsService, useClass: TagsServiceStub },
      ],
    });
    fixture = TestBed.createComponent(NoteModalComponent);
    component = fixture.componentInstance;

    dialogRef = TestBed.inject(MatDialogRef);
    notesService = TestBed.inject(NotesService);

    fixture.detectChanges();
  });

  describe('save', () => {
    it('should edit notes in notes service', () => {
      component.noteGroupForm.controls['title'].setValue('test');
      component['matDialogData'].note = notesMock[0];

      component.save();

      expect(notesService.notes[0].title).toEqual('test');
    });

    it('should add new note in notes service', () => {
      component.noteGroupForm.controls['title'].setValue('test');
      (component['matDialogData'] as { note: Note } | null) = null;

      component.save();

      expect(notesService.notes[2].title).toEqual('test');
    });

    it('should return if form invalid', () => {
      component.save();

      spyOn(dialogRef, 'close');

      expect(dialogRef.close).not.toHaveBeenCalled();
    });
  });
});
