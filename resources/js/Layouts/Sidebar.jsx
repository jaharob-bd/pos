import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Dashboard</h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none focus:bg-gray-600 p-2 rounded-md">
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>
      {/* Navigation Links */}
      <ul className="py-4 px-2">
        <li className="text-gray-300 py-2 hover:text-white cursor-pointer">Link 1</li>
        <li className="text-gray-300 py-2 hover:text-white cursor-pointer">Link 2</li>
        <li className="text-gray-300 py-2 hover:text-white cursor-pointer">Link 3</li>
      </ul>
    </div>
  );
};

export default Sidebar;
