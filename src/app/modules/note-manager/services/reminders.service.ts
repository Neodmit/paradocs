import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reminder } from '../types/reminder';
import { reminderMock } from '../../../../tests/mocks/reminder';

@Injectable()
export class RemindersService {
  reminders$ = new BehaviorSubject<Reminder[]>([reminderMock]);

  get reminders(): Reminder[] {
    return this.reminders$.getValue();
  }

  set reminders(value: Reminder[]) {
    this.reminders$.next(value);
  }
}
