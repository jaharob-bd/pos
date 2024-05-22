import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";

export default function Index({ auth }) {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user} header={''}>
            <Head title="Product" />
            <div className="w-full flex-grow flex">
                <div className="flex flex-col bg-blue-gray-50 h-full w-full py-0">
                    <div className="flex flex-row relative">

                    </div>
                    <div className="h-full overflow-hidden mt-4">
                        <div className="h-full overflow-y-auto px-2">
                            <div>
                                <h1>{t('email')}</h1>
                                <h2>{t('login')}</h2>
                                <h3>{t('logout')}</h3>
                                <h4>{t('setting')}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
