import { supabase } from '@utils/supabaseClient';

export interface TaskType {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface RawListTask {
  id?: number;
  list_id: number;
  task_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface BoardTask {
  id?: number;
  list_id?: number;
  task: TaskType;
}

export const createTask = async (task: TaskType) => {
  const { data, error } = await supabase
    .from<TaskType>('task')
    .insert({ ...task })
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const addTaskToBoard = async (rawBoardTask: RawListTask) => {
  const { data, error } = await supabase
    .from<RawListTask>('list_task')
    .insert({ ...rawBoardTask })
    .single();
  console.log(data, error);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getTaskByList = async (listId: number) => {
  const { data, error } = await supabase
    .from<BoardTask>('list_task')
    .select(
      `
      id,
      task:task_id (id, name, created_at, updated_at)
    `
    )
    .eq('list_id', listId);
  console.log(data);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
