import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { useState } from 'react';

interface ActivityType {
  id: number;
  title: string;
  category: string;
  //   onItemSelected: (item: string) => void;
}
interface ActivityDropDownProps {
  items: ActivityType[];
}

/* eslint-disable jsx-a11y/label-has-associated-control */
function ActivityDropDown({ items }: ActivityDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className='flex flex-col relative'>
      <label className='absolute top-[-0.65rem] pl-[0.5rem] pr-[0.5rem] left-[1rem] bg-[white] text-[black] z-10'>체험명</label>
      <button
        type='button'
        className='relative border border-black h-[5.6rem] text-left text-[black] text-[1.6rem] bg-[white] pl-[1.6rem] py-[1rem] pr-[2.5rem] rounded outline-none overflow-hidden text-ellipsis'
        onClick={handleButtonClick}
      >
        <div className='absolute flex flex-row w-[2.4rem] h-[2.4rem] text-[black] right-[1rem] bottom-[1.5rem]' /* onClick={handleClickDropDown} */>
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </div>
        {selectedItem || '선택'}
      </button>
      {isOpen && (
        <div className='absolute mt-[5.6rem] border-[black] border-[0.1rem] w-full rounded-md bg-white shadow-lg z-10 text-[black]'>
          <ul className='pt-[0.25rem]'>
            {items.map((item) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
              <li
                key={item.id}
                className='h-[5.6rem] flex items-center text-[1.6rem] cursor-pointer border-b select-none relative py-[0.5rem] pl-[1.75rem] pr-[2.25rem] hover:bg-gray-100'
                onClick={() => handleItemClick(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ActivityDropDown;
