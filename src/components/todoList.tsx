import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ItemsColumn from "./itemsColumn";
import Droppable from "./droppable";
import Confetti from 'react-confetti';
import { reorder } from "src/utils/helpers";
import { initialColumnData, initialTodoItems } from "src/utils/constants";
import { ColumnItem } from "src/utils/interface";



type ColumnType = { [key: string]: ColumnItem };


const TodoList = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [columnData, setColumnData] = useState<ColumnType>(initialColumnData);

  const addTask = (e) => {
    e.preventDefault();
    //const newTask = { id: `${Date.now()}`, content: e.target.elements.task.value };
    const todoColumn = columnData['todoColumn'];
    const new_id = todoColumn.items.reduce((maxId, task) => {
      return task.id > maxId ? task.id : maxId;
    }, todoColumn.items[0].id) + 1;

    const new_item = {
      id: new_id,
      title: e.target.elements.task.value
    }
    
    setColumnData({
      ...columnData,
      ['todoColumn']: {
        ...todoColumn,
        items: [new_item, ...todoColumn.items],
      },
    });
    e.target.reset();
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination?.droppableId;
    
    // REORDER: if source and destination droppable ids are same
    if (dInd && sInd === dInd) {
      const column = columnData[sInd];
      const reorderedItems = reorder(
        column.items,
        source.index,
        destination.index
      );

      setColumnData({
        ...columnData,
        [dInd]: {
          ...column,
          items: reorderedItems,
        },
      });
    }

    if (dInd && dInd !== sInd) {
      const sourceColumn = columnData[sInd];
      const desColumn = columnData[dInd];

      const itemToDrop = sourceColumn.items.find(
        (item) => item.id.toString() == result.draggableId
      );

      //INSERT: dragged item to another column
      if (itemToDrop) {
        const sourceColumnItems = Array.from(sourceColumn.items);
        const destColumnItems = Array.from(desColumn.items);

        sourceColumnItems.splice(result.source.index, 1);
        destColumnItems.splice(result.destination.index, 0, itemToDrop);

        setColumnData({
          ...columnData,
          [sInd]: {
            ...sourceColumn,
            items: sourceColumnItems,
          },
          [dInd]: {
            ...desColumn,
            items: destColumnItems,
          },
        });
        
        if (dInd === 'doneColumn') {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
        
      }
    }
  };

  return (
    <div className="w-[800px] mx-auto">
      {showConfetti && <Confetti />}
      <p className="py-12 text-3xl text-center font-semibold text-blue-800">
        Todo List
      </p>
      <div className="grid grid-cols-1  gap-x-4 justify-between  mb-6">
        <form onSubmit={addTask} className="task-form d-flex justify-content-center">
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
          <input type="text" name="task" className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" placeholder="Enter new task" required />
          <button type="submit" className="!absolute right-1 top-1 z-10 select-none rounded bg-pink-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none">Add Task</button>
        </div>
      </form>
      </div>
      <div className="grid grid-cols-3  gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columnData).map(([id, column]) => (
            <Droppable droppableId={id} key={id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ItemsColumn
                    columnTitle={column.title}
                    items={column.items}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;
