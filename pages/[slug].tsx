import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import { BoardType } from 'services/Boards';
import { getDashboardLayout } from '@components/common/Layout/DashboardLayout';
import Header from '@components/common/Layout/Header';

interface BoardSlugProps {
  board: BoardType;
}

const BoardSlug = ({ board }: BoardSlugProps) => {
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
        <main className="w-full h-full"></main>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BoardSlugProps> = async ({
  query,
}) => {
  const { data } = await supabase
    .from<BoardType>('board')
    .select('*')
    .eq('id', query.slug as string)
    .single();
  console.log(data);
  return {
    props: {
      board: data,
    },
  };
};

export default BoardSlug;
