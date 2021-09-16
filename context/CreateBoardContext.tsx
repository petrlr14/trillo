import { supabase } from '@utils/supabaseClient';
import { createContext, FC, useEffect, useState } from 'react';
import { getBoardsWallpepers } from 'services/Boards';

type CreateBoardContext = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  wallpapers: string[];
};

export const CreateBoardContext = createContext<CreateBoardContext>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  wallpapers: [],
});

export const CreateBoardProvider: FC = (props) => {
  const [isOpen, _setIsOpen] = useState(false);
  const [wallpapers, setWallpapers] = useState<string[]>([]);

  const setIsOpen = (value: boolean) => {
    _setIsOpen(value);
  };

  /* useEffect(() => {
    async function bootstrap() {
      const data = await getBoardsWallpepers();
      setWallpapers(data);
    }
    bootstrap();
  }, []); */

  useEffect(() => {
    async function bootstrap() {
      const data = await getBoardsWallpepers();
      setWallpapers(data);
    }
    bootstrap();
  }, [isOpen]);

  return (
    <CreateBoardContext.Provider
      value={{
        isOpen,
        wallpapers,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {props.children}
    </CreateBoardContext.Provider>
  );
};
