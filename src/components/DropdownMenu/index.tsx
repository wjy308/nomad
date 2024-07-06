interface DropdownMenuProps {
	type?: 'meatball' | 'gnb';
	dropdownMenuList: { text: string; handleClick: () => void }[];
  }
  
  export default function DropdownMenu({ type, dropdownMenuList }: DropdownMenuProps) {
	const baseStyles = "absolute top-full right-0 w-full z-10 bg-white border border-gray-300 rounded-lg shadow-md";
	const typeStyles = type === 'meatball' ? 'mt-12 md:mt-8' : 'mt-16 md:mt-8';
  
	return (
	  <div className={`${baseStyles} ${typeStyles}`}>
		{dropdownMenuList.map((dropdownMenu) => (
		  <button
			key={dropdownMenu.text}
			onClick={dropdownMenu.handleClick}
			className="flex items-center justify-center w-full py-4 px-2 border-t border-gray-300 text-lg font-medium text-gray-800 hover:bg-gray-300 first:border-t-0 first:rounded-t-lg last:rounded-b-lg md:py-2 md:text-sm"
		  >
			{dropdownMenu.text}
		  </button>
		))}
	  </div>
	);
  }
  