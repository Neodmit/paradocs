import { Reminder } from '../../app/modules/note-manager/types/reminder';
import { notesMock } from './notes';
import { createUUID } from '../../app/shared/utils/create-uuid';

export const reminderMock: Reminder = {
  id: createUUID(),
  title: 'Успеть погулять',
  notes: notesMock,
  time: '20/05/2024 12:30',
  isExecuted: false,
};
