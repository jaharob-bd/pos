import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const Edit = ({ auth, product }) => {
    const [user, setUser] = useState(auth.user); // auth state
    const [item, setItem] = useState(product); // item or product state

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + item.name} />
            <div className="mx-auto sm:px-2">
                <h1>Edit</h1>
                <h3>{item.name}</h3>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit