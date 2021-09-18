import { Close } from '@components/icons/Close';
import Plus from '@components/icons/Plus';
import Button from '@components/ui/Buttons';
import { AuthContext } from '@context/AuthContext';
import { RealtimeSubscription } from '@supabase/realtime-js';
import { supabase } from '@utils/supabaseClient';
import { useContext, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import toast from 'react-hot-toast';
import { BoardListType } from 'services/List';
import {
  addTaskToBoard,
  BoardTask,
  createTask,
  getTaskByList,
} from 'services/Task';

interface DragAndDropListProps {
  list: BoardListType;
}

const Column = ({ list }: DragAndDropListProps) => {
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);

  const [tasks, setTasks] = useState<BoardTask[]>([]);
  const [newTaskName, setNewTaskName] = useState('');

  const addTask = async () => {
    try {
      const newTask = await createTask({ name: newTaskName });
      await addTaskToBoard({
        task_id: newTask.id,
        list_id: list.id,
      });
      toast.success('Task created!');
      setNewTaskName('');
    } catch (e) {
      toast.error('Something bad happend');
    }
  };

  useEffect(() => {
    async function bootstrap() {
      const data = await getTaskByList(list.id);
      setTasks(data);
    }
    bootstrap();
    let onInsert: RealtimeSubscription = supabase
      .from<BoardTask>('list_task')
      .on('*', (payload) => bootstrap())
      .subscribe();
    return () => {
      supabase.removeSubscription(onInsert);
    };
  }, []);
  /* self-start p-2 w-full min-w-xs max-w-xs rounded space-y-1  max-h-full flex flex-col */
  return (
    <article className="self-start rounded bg-[#ebecf0] min-w-xs max-h-full p-2 flex flex-col">
      <h2 className="font-bold text-xl">{list.name}</h2>
      <Droppable droppableId={`droppable-list-${list.id}-task`}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="p-1 min-h-0 flex-auto space-y-3 overflow-y-auto"
          >
            {tasks.map(({ task, id }, index) => {
              return (
                <Draggable
                  key={`${id}-${task.id}`}
                  draggableId={`${id}-${task.id}`}
                  index={index}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        className="w-full p-2 bg-white rounded"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {task.name}
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {isAddingNewTask === false ? (
        <Button
          className="w-full p-2 hover:bg-[#091e4214] text-[#172b4d] font-normal rounded flex"
          onClick={() => setIsAddingNewTask(true)}
        >
          <span className="text-[#42526e]">
            <Plus />
          </span>
          <span>Add Card</span>
        </Button>
      ) : (
        <>
          <textarea
            className="w-full rounded shadow-brand focus:outline-none focus:ring-transparent"
            value={newTaskName}
            onChange={({ target }) => {
              setNewTaskName(target.value);
            }}
          />
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
