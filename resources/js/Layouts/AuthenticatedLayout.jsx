import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react'
// import LeftSidebar from '@/Components/LeftSidebar'
import Sidebar from "@/Components/AuthLayout/Sidebar"
import SubMenu from "@/Components/AuthLayout/SubMenu"
import Header from "@/Components/AuthLayout/Header"
import { SidebarOverlay } from '@/Components/AuthLayout/SidebarOverlay'

const determineActiveMenu = () => {
  return window.location.pathname;
}

export default function Authenticated({ user, header, children, props }) {
  // const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState('hide');

  useEffect(() => {
    // Effect to handle sidebar state on component mount
    const handleSidebarState = () => {
      const sidebarMenu = document.querySelector('.sidebar-menu');
      const sidebarOverlay = document.querySelector('.sidebar-overlay');

      if (window.innerWidth < 768) {
        sidebarOverlay.classList.toggle('hidden');
        sidebarMenu.classList.toggle('-translate-x-full');
      }
    };

    handleSidebarState(); // Call the function once on mount

    // Cleanup function if needed
    // return () => { cleanup tasks };

  }, []); // Empty dependency array to run effect only once

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const subMenuHandler = (show) => {
    setIsOpenSubMenu(show);
  }
  const activeMenu = determineActiveMenu();

  return (
    <div>
      <Sidebar isOpen={isOpen} subMenuHandler={subMenuHandler} />
      <SubMenu isOpenSubMenu={isOpenSubMenu} subMenuHandler={subMenuHandler} />
      <SidebarOverlay isOpen={isOpen} handleOverlayClick={handleOverlayClick} />
      <main className={`flex flex-col pl-2 ${isOpen ? 'ml-20' : 'w-full'}`}>
        <Header handleToggle={handleToggle} />
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>

  );
}
