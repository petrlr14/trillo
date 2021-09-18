import { supabase } from '@utils/supabaseClient';

export interface BoardListType {
  id?: number;
  name: string;
  board_id: number;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}

export const createList = async (list: BoardListType) => {
  const { data, error } = await supabase
    .from<BoardListType>('list')
    .insert({ ...list })
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getAllListFromBoard = async (board: number) => {
  const { data, error } = await supabase
    .from<BoardListType>('list')
    .select('*')
    .eq('board_id', board);
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};
