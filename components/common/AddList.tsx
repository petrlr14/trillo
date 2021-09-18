import { Close } from '@components/icons/Close';
import Plus from '@components/icons/Plus';
import Button from '@components/ui/Buttons';
import Input from '@components/ui/Input';
import { AuthContext } from '@context/AuthContext';
import {
  createRef,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { createList } from 'services/List';

interface AddListActiveProps {
  changeActive: () => void;
  addList: (title: string) => void;
}

const AddListActive = ({ changeActive, addList }: AddListActiveProps) => {
  const [title, setTitle] = useState('');
  const ref = createRef<HTMLFormElement>();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        changeActive();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (title === '') {
      toast.error('title should not be empty');
      return;
    }
    addList(title);
  };

  return (
    <form ref={ref} className="w-full rounded p-1 bg-white" onSubmit={onSubmit}>
      <Input
        className="w-full rounded p-1 ring-2 ring-blue-600"
        placeholder="Enter list title..."
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      />
      <div className="flex items-center space-x-4 pt-2">
        <Button className="py-1 px-1.5 rounded bg-brand-blue text-white font-semibold">
          Add Card
        </Button>
        <Button type="button" className="" onClick={changeActive}>
          <Close />
        </Button>
      </div>
    </form>
  );
};

interface AddListProps {
  boardId: number;
}

const AddList = (props: AddListProps) => {
  const [active, setActive] = useState(false);
  const { user } = useContext(AuthContext);
  const changeActive = () => {
    setActive(false);
  };
  const addList = async (title: string) => {
    try {
      const { name } = await createList({
        board_id: props.boardId,
        name: title,
        user_id: user.id,
      });
      toast.success(`List ${name} created!`);
      setActive(false);
    } catch (e) {
      throw e;
    }
  };
  return (
    <div className="w-full min-w-xs max-w-xs bg-[#00000014] hover:bg-[#00000029] h-10">
      {active === true ? (
        <AddListActive changeActive={changeActive} addList={addList} />
      ) : (
        <button
          className="w-full p-2 rounded flex space-x-1"
          onClick={() => setActive(true)}
        >
          <span>
            <Plus />
          </span>
          <span>Add another list</span>
        </button>
      )}
    </div>
  );
};

export default AddList;
