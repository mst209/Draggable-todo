export interface ITodoItem {
  id: number;
  title: string;
}

export interface ColumnItem {
  id: number;
  title: string;
  items: {
    id: number;
    title: string;
  }[];
}
