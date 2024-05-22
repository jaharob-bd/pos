import React, { useState, useEffect } from 'react'
import { Link } from '@inertiajs/react';
import LeftSidebar from '@/Components/LeftSidebar';

const determineActiveMenu = () => {
    return window.location.pathname;
}

export default function Authenticated({ user, header, children, props }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const activeMenu = determineActiveMenu();

    return (
        <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
            <LeftSidebar activeMenu={activeMenu} />
            {children}
        </div>
    );
}
