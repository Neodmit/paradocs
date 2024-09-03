import { BehaviorSubject } from 'rxjs';
import { Reminder } from '../../app/modules/note-manager/types/reminder';
import { reminderMock } from '../mocks/reminder';
import { createUUID } from '../../app/shared/utils/create-uuid';

export class RemindersServiceStub {
  reminders$ = new BehaviorSubject<Reminder[]>([
    reminderMock,
    { ...reminderMock, id: createUUID() },
  ]);

  get reminders(): Reminder[] {
    return this.reminders$.getValue();
  }

  set reminders(value: Reminder[]) {
    this.reminders$.next(value);
  }
}
