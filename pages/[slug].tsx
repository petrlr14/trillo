import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { supabase } from '@utils/supabaseClient';
import { BoardType } from 'services/Boards';
import { getDashboardLayout } from '@components/common/Layout/DashboardLayout';

interface BoardSlugProps {
  board: BoardType;
}

const BoardSlug = ({ board }: BoardSlugProps) => {
  return (
    <>
      <Head>
        <title>{board.name}</title>
      </Head>
      <main
        className="w-full h-screen"
        style={{
          backgroundImage: `url(${board.wallpaper})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></main>
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
