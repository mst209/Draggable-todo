export const initialTodoItems = [
  {
    id: 1,
    title: "Go for a walk",
  },
  {
    id: 2,
    title: "Take a nap",
  },
  {
    id: 3,
    title: "Read a book",
  }
];

export const initialColumnData = {
  todoColumn: {
    id: 1,
    title: "To do",
    items: [...initialTodoItems],
  },
  doingColumn: {
    id: 2,
    title: "Doing",
    items: [],
  },
  doneColumn: {
    id: 3,
    title: "Done",
    items: [],
  },
};