import { NoteManagerComponent } from './note-manager.component';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { TagsService } from '../../services/tags.service';
import { NotesService } from '../../services/notes.service';
import { TagsServiceStub } from '../../../../../tests/stubs/tags.service.stub';
import { NotesServiceStub } from '../../../../../tests/stubs/notes.service.stub';
import { RemindersService } from '../../services/reminders.service';
import { RemindersServiceStub } from '../../../../../tests/stubs/reminders.service.stub';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { NotesComponent } from '../notes/notes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RemindersComponent } from '../reminders/reminders.component';
import { TagsComponent } from '../tags/tags.component';
import { SharedModule } from '../../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NoteManagerComponent', () => {
  let fixture: ComponentFixture<NoteManagerComponent>;

  let tagsService: TagsService;
  let notesService: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NoteManagerComponent,
        NotesComponent,
        RemindersComponent,
        TagsComponent,
      ],
      imports: [
        MatSnackBarModule,
        MatTabsModule,
        MatDialogModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TagsService, useClass: TagsServiceStub },
        {
          provide: NotesService,
          useClass: NotesServiceStub,
        },
        {
          provide: RemindersService,
          useClass: RemindersServiceStub,
        },
      ],
    });
    fixture = TestBed.createComponent(NoteManagerComponent);

    tagsService = TestBed.inject(TagsService);
    notesService = TestBed.inject(NotesService);

    fixture.detectChanges();
  });

  it('should call initTagConsistencySubscription and initNoteConsistencySubscription', fakeAsync(() => {
    expect(tagsService.initTagConsistencySubscription).toHaveBeenCalled();
    expect(notesService.initNoteConsistencySubscription).toHaveBeenCalled();
  }));
});
