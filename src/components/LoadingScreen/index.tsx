import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className='fixed inset-0 flex space-x-2 justify-center items-center bg-white dark:invert z-50'>
      <span className='sr-only'>Loading...</span>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
    </div>
  );
};

export default LoadingScreen;