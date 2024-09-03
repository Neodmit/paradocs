import { TableFields } from '../../../shared/types/table';

export const notesTableFields: TableFields = {
  title: { name: 'Заголовок' },
  content: { name: 'Содержание' },
  tags: { name: 'Тэги', key: 'title', isCellMultipleMode: true },
};
