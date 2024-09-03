export type BaseRowItem = any;

export type TableFields = {
  [key: string]: ColumnData;
};

export type ColumnData = {
  name: string;
  key?: string;
  isCellMultipleMode?: boolean;
};
