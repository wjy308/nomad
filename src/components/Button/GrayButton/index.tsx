import React from 'react';

interface Props {
  text: string;
  onClick: () => void;
  width?: string;
  height?: string;
}

function GrayButton({ text, onClick, width = 'w-full', height = 'h-auto' }: Props) {
  const handleClick = () => {
    onClick();
  };

  return (
    <button type='button' onClick={handleClick} className={`flex justify-center items-center px-5 py-3 font-bold rounded-md bg-[#a4a1aa] text-white ${width} ${height}`}>
      {text}
    </button>
  );
}

export default GrayButton;
