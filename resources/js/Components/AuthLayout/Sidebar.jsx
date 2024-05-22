import React from 'react'
import { Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

function Sidebar({ isOpen, subMenuHandler }) {
    const { t } = useTranslation();

    return (
        <div className={`fixed left-0 top-0 h-full bg-gray-900 p-4 z-50 sidebar sidebar-menu transition-transform ${isOpen ? 'block' : '-translate-x-full'}`}>
            <a href="#" className="flex items-center pb-8 border-b border-b-gray-800">
                <img src="https://placehold.co/32x32" alt className="w-12 h12 rounded object-cover" />
            </a>
            <ul className="nav-links mt-4 space-y-2">
                <li class="active hover:bg-cyan-400">
                    <Link href={route('dashboard')}>
                        <i class="ri-home-2-line"></i>
                        <span class="link_name">{t('dashboard')}</span>
                    </Link>
                </li>
                <li class="active hover:bg-cyan-400">
                    <a onClick={() => { subMenuHandler('show') }}>
                        <i class="ri-flashlight-line"></i>
                        <span class="link_name">{t('flash')}</span>
                    </a>
                </li>
                <li class="active hover:bg-cyan-400">
                    <a onClick={() => { subMenuHandler('show') }}>
                        <i class="ri-instance-line"></i>
                        <span class="link_name">{t('invoice')}</span>
                    </a>
                </li>
                <li class="active hover:bg-cyan-400">
                    <a onClick={() => { subMenuHandler('show') }}>
                        <i class="ri-store-line"></i>
                        <span class="link_name">{t('inventory')}</span>
                    </a>
                </li>
                <li class="active hover:bg-cyan-400">
                    <a onClick={() => { subMenuHandler('show') }}>
                        <i class="ri-settings-5-line"></i>
                        <span class="link_name">{t('setting')}</span>
                    </a>
                </li>
                <li class="active hover:bg-cyan-400">
                    <a onClick={() => { subMenuHandler('show') }}>
                        <i class="ri-secure-payment-line"></i>
                        <span class="link_name">{t('security')}</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
