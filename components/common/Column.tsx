import { Close } from '@components/icons/Close';
import Plus from '@components/icons/Plus';
import Button from '@components/ui/Buttons';
import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { BoardListType } from 'services/List';
import { addTaskToBoard, createTask } from 'services/Task';

interface DragAndDropListProps {
  list: BoardListType;
}

const Column = ({ list }: DragAndDropListProps) => {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const addTask = async () => {
    try {
      const newTask = await createTask({ name: newTaskName });
      const newTaskBoard = await addTaskToBoard({
        task_id: newTask.id,
        board_id: 0,
      });
    } catch (e) {}
  };
  return (
    <article className="p-2 w-full max-w-xs rounded space-y-1 bg-[#ebecf0]">
      <h2 className="font-bold text-xl">{list.name}</h2>
      <Droppable droppableId="droppable" type="COLUMN" ignoreContainerClipping>
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isAddingNewTask === false ? (
        <Button
          className="w-full p-1 hover:bg-[#091e4214] text-[#172b4d] font-normal rounded flex"
          onClick={() => setIsAddingNewTask(true)}
        >
          <span className="text-[#42526e]">
            <Plus />
          </span>
          <span>Add Card</span>
        </Button>
      ) : (
        <>
          <textarea className="w-full rounded shadow-brand focus:outline-none focus:ring-transparent" />
          <div className="flex items-center space-x-4">
            <button
              className="py-1 px-1.5 bg-brand-blue text-white rounded"
              onClick={addTask}
            >
              Add Card
            </button>
            <button
              className="text-[#42526e]"
              onClick={() => setIsAddingNewTask(false)}
            >
              <Close />
            </button>
          </div>
        </>
      )}
    </article>
  );
};

export default Column;
