import { NotesService } from './notes.service';
import { TestBed } from '@angular/core/testing';
import { RemindersServiceStub } from '../../../../tests/stubs/reminders.service.stub';
import { RemindersService } from './reminders.service';
import { notesMock } from '../../../../tests/mocks/notes';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotesService,
        {
          provide: RemindersService,
          useClass: RemindersServiceStub,
        },
      ],
    });

    service = TestBed.inject(NotesService);
  });

  it('should init subscription', () => {
    expect(!!service['subscribe']).toBeFalse();

    service.initNoteConsistencySubscription();

    expect(!!service['subscribe']).toBeTrue();
  });

  it('should unsubscribe from tag consistency subscription', () => {
    service.initNoteConsistencySubscription();

    spyOn(service['subscribe'], 'unsubscribe');

    service.destroySubscription();

    expect(service['subscribe'].unsubscribe).toHaveBeenCalled();
  });

  it('should get and set notes', () => {
    service.notes = notesMock;

    expect(service.notes).toEqual(notesMock);
  });
});
