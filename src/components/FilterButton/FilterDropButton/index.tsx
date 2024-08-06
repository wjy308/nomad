import DropdownMenu from '@/components/DropdownMenu';
import { dropFilterCategories } from '@/constant/filterCategoryOptions';
import { StatusFilter } from '@/types/StatusFilter';
import React, { useState } from 'react';

interface FilterDropButtonProps {
  text: string;
  setFunc: React.Dispatch<React.SetStateAction<StatusFilter | undefined>>;
}

function FilterDropButton({ text, setFunc }: FilterDropButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  // const [currentOption, setCurrentOption] = useState(text);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const filterCategoryClick = (status: StatusFilter) => {
    // setCurrentOption(optionText);
    setFunc(status);
    setIsOpen(false);
  };

  const dropFilterCategoryList = dropFilterCategories(filterCategoryClick);

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={handleToggle}
        className='sm:w-[16rem] w-[10.7rem] py-[1rem] px-[2rem] md:py-[1.6rem] rounded-[1.5rem] border text-[#0B3B2D] dark:text-gray-10 text-[1.8rem] font-[500] bg-[#FFFFFF] dark:bg-black border-[#0B3B2D] dark:border-gray-10 flex items-center justify-between'
      >
        {text}
        <span className={`ml-2 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▼</span>
      </button>
      {isOpen && <DropdownMenu type='gnb' dropdownMenuList={dropFilterCategoryList} positionClasses='top-0 ' />}
    </div>
  );
}

export default FilterDropButton;
