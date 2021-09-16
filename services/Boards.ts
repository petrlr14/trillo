import { supabase } from '@utils/supabaseClient';

export interface BoardType {
  id?: number;
  name: string;
  user_id: string;
  wallpaper: string;
  created_at?: string;
}

export const createBoard = async (board: BoardType) => {
  const { data, error } = await supabase
    .from<BoardType>('board')
    .insert({ ...board })
    .single();
  if (error) {
    console.log(error);
    throw error;
  }
  return data;
};

export const getAllBoards = async () => {
  const { data, error } = await supabase.from<BoardType>('board').select('*');
  if (error) {
    console.log(error);
    return [];
  }
  return data;
};

export const getBoardsWallpepers = async () => {
  const { data, error } = await supabase.storage.from('wallpapers').list();
  if (error) {
    console.log(error);
    return [];
  }
  return data.map(({ name }) => {
    const { publicURL } = supabase.storage
      .from('wallpapers')
      .getPublicUrl(name);
    return publicURL;
  });
};
