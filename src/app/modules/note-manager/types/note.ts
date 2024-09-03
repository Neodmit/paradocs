import { Tag } from './tag';

export type Note = {
  id: string;
  title: string;
  content: string;
  tags?: Tag[];
};
