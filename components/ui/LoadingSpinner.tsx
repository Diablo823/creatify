import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="relative flex flex-col items-center gap-2">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
        <span className="text-sm font-medium text-gray-500">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;