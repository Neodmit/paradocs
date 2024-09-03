import { NotesComponent } from './notes.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesService } from '../../services/notes.service';
import { NotesServiceStub } from '../../../../../tests/stubs/notes.service.stub';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { notesMock } from '../../../../../tests/mocks/notes';
import { NoteModalComponent } from '../modals/note-modal/note-modal.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  let notesService: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [MatDialogModule, SharedModule],
      providers: [
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;

    notesService = TestBed.inject(NotesService);

    fixture.detectChanges();
  });

  it('should call open for dialog window using addNote', () => {
    spyOn(component.dialog, 'open');

    component.addNote();

    expect(component.dialog.open).toHaveBeenCalledWith(NoteModalComponent, {
      height: '400px',
      width: '600px',
    });
  });

  it('should call open for dialog window using editNote', () => {
    spyOn(component.dialog, 'open');

    component.editNote(notesMock[0].id);

    expect(component.dialog.open).toHaveBeenCalledWith(NoteModalComponent, {
      height: '400px',
      width: '600px',
      data: { note: notesMock[0] },
    });
  });

  it('should delete note element by id', () => {
    expect(notesService.notes.length).toEqual(2);

    component.deleteNote(notesMock[0].id);

    expect(notesService.notes.length).toEqual(1);
  });
});
