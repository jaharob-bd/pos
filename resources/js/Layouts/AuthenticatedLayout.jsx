import React, { useState, useEffect } from 'react'
import { Link, usePage } from '@inertiajs/react'
// import LeftSidebar from '@/Components/LeftSidebar'
import Sidebar from "@/Components/AuthLayout/Sidebar"
import SubMenu from "@/Components/AuthLayout/SubMenu"
import Header from "@/Components/AuthLayout/Header"
import { SidebarOverlay } from '@/Components/AuthLayout/SidebarOverlay'
import Swal from 'sweetalert2';

const determineActiveMenu = () => {
  return window.location.pathname;
}

export default function Authenticated({ user, header, children, props }) {
  const { flash } = usePage().props;
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState('hide');
  // console.log(props);
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
    handleSidebarState();
    if (flash) {
      // validation error
      if (flash.errors && flash.errors.length > 0) {
        Swal.fire({
          title: 'Validation Errors',
          html: '<ul>' + flash.error.map(err => `<li>${err}</li>`).join('') + '</ul>',
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      }
      if (flash.failed) {
        Swal.fire({
          text: flash.error,
          icon: 'error',
          timer: 5000,
          timerProgressBar: true,
        });
      }
      if (flash.warning) {
        Swal.fire({
          text: flash.warning,
          icon: 'warning',
          timer: 5000,
          timerProgressBar: true,
        });
      }
      if (flash.success) {
        Swal.fire({
          text: flash.success,
          icon: 'success',
          timer: 5000,
          timerProgressBar: true,
        });
      }
    }
  }, [flash]);


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
