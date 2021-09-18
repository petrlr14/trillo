import { supabase } from '@utils/supabaseClient';

export interface TaskType {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface RawListTask {
  id?: number;
  board_id: number;
  task_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface BoardTask {
  id?: number;
  task_id: TaskType;
}

export const createTask = async (task: TaskType) => {
  const { data, error } = await supabase
    .from<TaskType>('board')
    .insert({ ...task })
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const addTaskToBoard = async (rawBoardTask: RawListTask) => {
  const { data, error } = await supabase.from<RawListTask>('list_task');
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
