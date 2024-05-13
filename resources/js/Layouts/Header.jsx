import React from 'react';

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="bg-gray-900 text-white h-16 flex justify-between items-center">
      <h1 className="text-xl font-semibold ml-4">Admin Dashboard</h1>
      <button onClick={toggleSidebar} className="mr-4 text-white focus:outline-none focus:bg-gray-600 p-2 rounded-md">
        {isSidebarOpen ? 'Hide Sidebar' : 'Show Sidebar'}
      </button>
    </div>
  );
};

export default Header;
