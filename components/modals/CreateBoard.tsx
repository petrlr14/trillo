import CheckMark from '@components/icons/CheckMark';
import Close from '@components/icons/Close';
import Button from '@components/ui/Buttons';
import Input from '@components/ui/Input';
import { AuthContext } from '@context/AuthContext';
import { CreateBoardContext } from '@context/CreateBoardContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, SyntheticEvent, useContext, useState } from 'react';
import { createBoard } from 'services/Boards';

const CreateBoard = () => {
  const { user } = useContext(AuthContext);
  const { isOpen, closeModal, wallpapers } = useContext(CreateBoardContext);
  const [name, setName] = useState('');
  const [wallpaperSelected, setWallpaperSelected] = useState(wallpapers[0]);

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    createBoard({ name, user_id: user.id, wallpaper: wallpaperSelected });
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-[#00000070]"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex justify-between">
                  <Dialog.Title
                    as="h3"
                    className="py-3 text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a new Board
                  </Dialog.Title>
                  <button onClick={closeModal}>
                    <Close />
                  </button>
                </div>
                <form onSubmit={onSubmit}>
                  <Input
                    placeholder="Enter board name"
                    className="w-full p-2 border rounded"
                    value={name}
                    onChange={({ target: { value } }) => {
                      setName(value);
                    }}
                  />
                  <div className="mt-2 flex flex-wrap gap-1">
                    {wallpapers.map((wallpaper) => {
                      const isWallpaperSelected =
                        wallpaperSelected === wallpaper;
                      return (
                        <Button
                          type="button"
                          className="relative w-40 h-20 rounded overflow-hidden"
                          key={wallpaper}
                          onClick={() => {
                            setWallpaperSelected(wallpaper);
                          }}
                        >
                          <div
                            className={`absolute top-0 w-full h-full transition-colors text-white hover:bg-black hover:bg-opacity-10 flex justify-end p-2 ${
                              isWallpaperSelected && 'bg-black bg-opacity-20'
                            }`}
                          >
                            {isWallpaperSelected && <CheckMark />}
                          </div>
                          <img src={wallpaper} className="w-full h-full" />
                        </Button>
                      );
                    })}
                  </div>

                  <div className="w-full flex justify-end mt-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      onClick={closeModal}
                    >
                      Create Board
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateBoard;
