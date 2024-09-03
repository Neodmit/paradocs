import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { Note } from '../types/note';
import { notesMock } from '../../../../tests/mocks/notes';
import { RemindersService } from './reminders.service';

@Injectable()
export class NotesService {
  notes$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(notesMock);

  constructor(private reminderService: RemindersService) {}

  private subscribe: Subscription;

  initNoteConsistencySubscription() {
    this.subscribe = this.notes$
      .pipe(
        tap((notes) => {
          const noteIds = notes.map((note) => note.id);

          this.reminderService.reminders = this.reminderService.reminders.map(
            (reminder) => {
              reminder.notes = reminder.notes?.filter((note) =>
                noteIds.includes(note.id)
              );

              return reminder;
            }
          );
        })
      )
      .subscribe();
  }

  destroySubscription() {
    this.subscribe.unsubscribe();
  }

  get notes(): Note[] {
    return this.notes$.getValue();
  }

  set notes(value: Note[]) {
    this.notes$.next(value);
  }
}
