import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { getDashboardLayout } from '@components/common/Layout/DashboardLayout';
import { BoardType, createBoard, getAllBoards } from 'services/Boards';
import { AuthContext } from '@context/AuthContext';
import { GetServerSideProps } from 'next';
import { supabase } from '@utils/supabaseClient';
import { RealtimeSubscription } from '@supabase/realtime-js';
import Board from '@components/common/Board';
import CreateBoard from '@components/modals/CreateBoard';
import { CreateBoardContext } from '@context/CreateBoardContext';
import UserGroup from '@components/icons/UserGroup';

interface DashboardProps {
  _boards: BoardType[];
}

const Dashboard = ({ _boards }: DashboardProps) => {
  const { user } = useContext(AuthContext);
  const [boards, setBoards] = useState<BoardType[]>([]);
  const { openModal } = useContext(CreateBoardContext);

  useEffect(() => {
    async function bootstrap() {
      const data = await getAllBoards();
      setBoards(data);
    }
    bootstrap();
    let subs: RealtimeSubscription = supabase
      .from<BoardType>('board')
      .on('*', (payload) => bootstrap())
      .subscribe();
    return () => {
      supabase.removeSubscription(subs);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="p-3 flex space-x-1 items-center">
        <UserGroup />
        <h1 className="text-2xl font-semibold">Your workspace boards</h1>
      </div>
      <div className="flex flex-wrap gap-2">
        {boards.map((board) => {
          return <Board key={board.id} board={board}></Board>;
        })}
        <button
          type="button"
          onClick={openModal}
          className="p-3 transition-colors bg-gray-200 hover:bg-gray-100 rounded w-40 font-semibold"
        >
          Create
        </button>
      </div>
    </>
  );
};

Dashboard.getLayout = getDashboardLayout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (user) {
    const boards = await getAllBoards();
    return {
      props: {
        _boards: boards,
      },
    };
  }
  return {
    props: {
      _boards: [],
    },
  };
};

export default Dashboard;
