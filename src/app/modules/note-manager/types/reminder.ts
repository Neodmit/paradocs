import { Note } from './note';

export type Reminder = {
  id: string;
  title: string;
  notes: Note[];
  time: string;
  isExecuted: boolean;
};
