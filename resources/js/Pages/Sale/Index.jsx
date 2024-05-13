import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} header={''}>
            <Head title="Sales" />
            <h1>Sales</h1>
        </AuthenticatedLayout>
    );
}
