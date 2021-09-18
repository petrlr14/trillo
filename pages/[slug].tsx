import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import { BoardType } from 'services/Boards';
import Header from '@components/common/Layout/Header';
import { DragDropContext } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import Column from '@components/common/Column';
import { getAllListFromBoard, BoardListType } from 'services/List';
import { RealtimeSubscription } from '@supabase/realtime-js';
import Plus from '@components/icons/Plus';
import AddList from '@components/common/AddList';

interface BoardSlugProps {
  board: BoardType;
  lists: BoardListType[];
}

const BoardSlug = ({ board, lists }: BoardSlugProps) => {
  const [_lists, setLists] = useState(lists);

  useEffect(() => {
    async function bootstrap() {
      const data = await getAllListFromBoard(board.id);
      setLists(data);
    }
    let onInsert: RealtimeSubscription = supabase
      .from<BoardType>('list')
      .on('INSERT', (payload) => bootstrap())
      .subscribe();
    let onDelete: RealtimeSubscription = supabase
      .from<BoardType>('list')
      .on('DELETE', (payload) => bootstrap())
      .subscribe();
    return () => {
      supabase.removeSubscription(onInsert);
      supabase.removeSubscription(onDelete);
    };
  }, []);

  const onDragEnd = () => {};

  return (
    <>
      <Head>
        <title>{board.name}</title>
      </Head>
      <div
        className="flex flex-col w-full h-screen min-h-screen"
        style={{
          backgroundImage: `url(${board.wallpaper})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <Header bgColor="bg-[#00000052]" />
        <main className="relative w-full max-w-full h-full overflow-x-auto">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="w-full absolute top-0 left-0 flex p-2 gap-2">
              {_lists.map((list) => {
                return <Column key={list.id} list={list} />;
              })}
              <AddList boardId={board.id} />
            </div>
          </DragDropContext>
        </main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BoardSlugProps> = async ({
  query,
}) => {
  const { data: board } = await supabase
    .from<BoardType>('board')
    .select('*')
    .eq('id', query.slug as string)
    .single();
  if (!board) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }
  const { data: lists } = await supabase
    .from<BoardListType>('list')
    .select('*')
    .eq('board_id', board.id);
  console.log(lists);
  return {
    props: {
      board,
      lists: lists || [],
    },
  };
};

export default BoardSlug;
