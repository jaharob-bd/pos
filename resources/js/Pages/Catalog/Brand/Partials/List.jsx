import { Link } from '@inertiajs/react';
import React from 'react';

export const List = ({ openModal, brands }) => {
    return (
        <div className="mx-auto sm:px-2">
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold">Brands</p>
                <div className="flex gap-x-2.5 items-center">
                    <div>
                        <button
                            className="text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            <i className="ri-export-fill"></i>
                            Export
                        </button>
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={() => openModal()}>Create Brand</button>
                    </div>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    <input type="checkbox" />
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Brand Code
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Notes
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100" />
                            </tr>
                        </thead>
                        <tbody>
                            {brands?.map((brand) => (
                                <tr key={brand.id} className="brand">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><input type="checkbox" className="form-control" /></td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {brand.name}
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{brand.brand_code}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap">{brand.notes}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${brand.status === 1 ? 'text-green-900' : 'text-red-900'}`}>
                                            <span aria-hidden className={`absolute inset-0 ${brand.status === 1 ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`} />
                                            <span className="relative">{brand.status === 1 ? 'Active' : 'Inactive'}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <button onClick={() => openModal(brand)} type="button" className="inline-block text-gray-500 hover:text-gray-700">
                                            <i className="ri-edit-circle-line"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
