import Card from "./card";

interface ItemsColumnProps {
  columnTitle: string;
  items: { id: number; title: string }[];
}

const ItemsColumn = ({ columnTitle, items }: ItemsColumnProps) => {
  return (
    <div
      className="h-[600px] scrollbar-thin scrollbar-thumb-blue-700 
    scrollbar-track-blue-300 overflow-y-auto
      p-4 rounded-md border border-blue-300"
    >
      <p className="inline-block py-1 px-2 text-lg font-semibold bg-blue-300 rounded-md">
        {columnTitle}
      </p>
      <div className=" pt-4 flex flex-col gap-y-3">
        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <Card
              key={item.id}
              draggableId={item.id.toString()}
              index={index}
              id={item.id}
              title={item.title}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemsColumn;
