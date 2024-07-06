import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useOutsideClick from '@/hooks/useOutsideClick';
import useToggleButton from '@/hooks/useToggleButton';
import { ICON } from '@/constant';

const { downArrow, check } = ICON;

interface DropdownProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  labelText?: string;
  lists: { id: number; category: string; title?: string }[];
  onSelectedId: (id: number) => void;
  selectedCategoryId?: number;
}

export default forwardRef<HTMLInputElement, DropdownProps>(function Dropdown(
  { name, labelText, lists, onSelectedId, selectedCategoryId, ...props },
  ref
) {
  const { isToggle, handleToggleClick } = useToggleButton();
  const list = lists ?? [];
  const [selectedList, setSelectedList] = useState<number | null>(selectedCategoryId || null);
  const dropdownRef = useRef(null);
  const findId = list.find((item) => item.id === selectedList);
  const isLabelText = labelText ? findId?.title : findId?.category;

  useOutsideClick(dropdownRef, isToggle, handleToggleClick);

  const handleSelectedClick = (id: number) => {
    setSelectedList(id);
    onSelectedId(id);
    handleToggleClick();
  };

  useEffect(() => {
    setSelectedList(labelText ? list[0]?.id : null);
  }, [list]);

  return (
    <div className="relative flex flex-col justify-center items-start w-full">
      <button
        className={`relative w-full p-3.5 bg-white border border-black rounded cursor-pointer flex justify-between items-center ${
          isToggle ? 'rotate-arrow' : ''
        }`}
        type="button"
        onClick={handleToggleClick}
        ref={dropdownRef}
      >
        <input
          {...props}
          className="w-full bg-white border-none cursor-pointer outline-none"
          name={name}
          readOnly
          value={isLabelText || ''}
          ref={ref}
        />
        {labelText && <span className="absolute top-[-0.8rem] left-[1.2rem] bg-white px-1 z-10 text-[1.4rem] font-normal">{labelText}</span>}
        <Image
          className={`absolute top-1/2 right-0 transform -translate-y-1/2 transition-transform ${
            isToggle ? 'rotate-180' : ''
          }`}
          src={downArrow.default.src}
          alt={downArrow.default.alt}
          width={48}
          height={48}
        />
      </button>
      <ul
        className={`absolute top-[5.8rem] w-full p-2 bg-white rounded shadow-md opacity-0 invisible transition-opacity ${
          isToggle ? 'opacity-100 visible' : ''
        }`}
      >
        {list.map((list) => (
          <li key={`key-${list.id}`}>
            <button
              type="button"
              className={`w-full p-2 flex items-center gap-2 rounded hover:bg-gray-700 hover:text-white ${
                list.id === selectedList ? 'bg-gray-700 text-white' : ''
              }`}
              onClick={() => handleSelectedClick(list.id)}
            >
              {list.id === selectedList && (
                <Image src={check.default.src} alt={check.default.alt} width={20} height={20} />
              )}
              <span>{labelText ? list.title : list.category}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});
