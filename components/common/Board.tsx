import Link from 'next/link';
import { BoardType } from 'services/Boards';

interface BoardProps {
  board: BoardType;
}

const Board = ({ board }: BoardProps) => {
  return (
    <Link href={`/${board.id}`}>
      <a>
        <article
          className="relative rounded w-40 h-20 overflow-hidden"
          style={{
            backgroundImage: `url(${board.wallpaper})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <div className="bg-[#00000030] p-3 w-full h-full">
            <h1 className="text-white font-semibold">{board.name}</h1>
          </div>
        </article>
      </a>
    </Link>
  );
};

export default Board;
