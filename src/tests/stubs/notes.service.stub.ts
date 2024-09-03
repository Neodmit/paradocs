import { BehaviorSubject } from 'rxjs';
import { Note } from '../../app/modules/note-manager/types/note';
import { notesMock } from '../mocks/notes';

const createSpy = jasmine.createSpy;

export class NotesServiceStub {
  notes$ = new BehaviorSubject<Note[]>(notesMock);

  initNoteConsistencySubscription = createSpy();
  destroySubscription = createSpy();

  get notes(): Note[] {
    return this.notes$.getValue();
  }

  set notes(value: Note[]) {
    this.notes$.next(value);
  }
}
