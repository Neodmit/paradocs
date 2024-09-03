import { Tag } from '../../app/modules/note-manager/types/tag';
import { createUUID } from '../../app/shared/utils/create-uuid';

export const tagsMock: Tag[] = [
  { id: createUUID(), title: 'Дом' },
  { id: createUUID(), title: 'Работа' },
  { id: createUUID(), title: 'Личная жизнь' },
  { id: createUUID(), title: 'Прогулки' },
];
