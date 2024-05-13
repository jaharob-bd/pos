import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth }) {
    const items = [
        {
            'code': 1001,
            'id': 1,
            'qty': 1,
            'name': 'Burger Asiatique',
            'note': 'Extra Sauce',
            'price': 12.5,
            'devise': '$',
            'available': 12,
            'urlImage': '/products/br-1.jpeg',
            'id_category': 1,

        },
        {
            'code': 1002,
            'id': 2,
            'qty': 1,
            'name': 'Burger Afrique',
            'note': 'Extra Egg',
            'price': 12.5,
            'devise': '$',
            'available': 20,
            'urlImage': '/products/br-2.jpeg',
            'id_category': 1,

        },
        {
            'code': 1003,
            'id': 3,
            'qty': 1,
            'name': 'Burger French',
            'note': 'With Mayo',
            'price': 20.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-3.jpeg',
            'id_category': 1,

        },
        {
            'code': 1004,
            'id': 4,
            'qty': 1,
            'name': 'Burger Indian',
            'note': 'with Mustard',
            'price': 9.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-4.jpeg',
            'id_category': 1,
        }

    ];

    return (
        <AuthenticatedLayout user={auth.user} header={''}>
            <Head title="Product" />
            <div className="w-full flex-grow flex">
                <div className="flex flex-col bg-blue-gray-50 h-full w-full py-0">
                    <div className="flex flex-row relative">
                        <nav className="w-full flex flex-wrap items-center justify-between bg-blue-200">
                            <div width="155px" height="43px"></div>
                            <div className="toggle hidden w-full md:w-auto md:flex text-center text-bold  md:mt-0 border-t-2 border-blue-900 md:border-none">
                                <a href="#" className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Home</a>
                                <a href="#" className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Products</a>
                                <a href="#" className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Pricing</a>
                                <a href="#" className="block md:inline-block text-blue-900 hover:text-blue-500 px-3 py-3 border-b-2 border-blue-900 md:border-none">Contact</a>
                            </div>
                            <a href="#" className="toggle hidden md:flex w-full md:w-auto px-4 py-2 text-right text-white md:rounded"></a>
                        </nav>
                    </div>
                    <div className="h-full overflow-hidden mt-4">
                        <div className="h-full overflow-y-auto px-2">
                            {
                                items.length > 0 ?
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-indigo-500 h-10 border border-indigo-500 text-white">
                                                <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                                <th className="border-l border-r border-b border-indigo-500">Product Name</th>
                                                <th className="border-l border-r border-b border-indigo-500">Unit Price</th>
                                                <th className="border-l border-r border-b border-indigo-500">Quantity</th>
                                                <th className="p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                items.map((item, i) => {
                                                    return (
                                                        <tr key={item.id} className="font-bold">
                                                            <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                            <td className="pl-1 border-l border-r border-b border-indigo-500">{item.name}</td>
                                                            <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{item.price}</td>
                                                            <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">1</td>
                                                            <td className="pl-1 border-l border-r border-b border-indigo-500"></td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    :
                                    <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                        <div className="w-full text-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <p className="text-xl">
                                                CART IS EMPTY !!
                                            </p>
                                        </div>
                                    </div>

                                // products
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
