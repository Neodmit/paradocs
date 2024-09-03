import { Note } from '../../app/modules/note-manager/types/note';
import { tagsMock } from './tags';
import { createUUID } from '../../app/shared/utils/create-uuid';

export const notesMock: Note[] = [
  {
    id: createUUID(),
    title: 'Прогулка',
    content: 'Во время прогулки зайти в магазин и купать яиц и хлеб',
    tags: [tagsMock[2], tagsMock[3]],
  },
  {
    id: createUUID(),
    title: 'Полить цветы',
    content: 'Полить секуленту',
    tags: [tagsMock[0], tagsMock[3]],
  },
];
