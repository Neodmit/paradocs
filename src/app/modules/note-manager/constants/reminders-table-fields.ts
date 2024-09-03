import { TableFields } from '../../../shared/types/table';

export const remindersTableFields: TableFields = {
  title: { name: 'Заголовок' },
  notes: { name: 'Заметка', key: 'title', isCellMultipleMode: true },
  time: { name: 'Время' },
};
