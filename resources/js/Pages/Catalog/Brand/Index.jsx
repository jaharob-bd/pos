import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { List } from './Partials/List';
import SwalWarning from '@/Components/Alert/SwalWarning';

export default function Index({ auth, brands }) {
    // Initial form values
    const initialValues = {
        name: '',
        brand_code: '',
        notes: '',
        status: '1',
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentBrandId, setCurrentBrandId] = useState(null);
    const [item, setItem] = useState(brands);
    const { data, setData, processing, reset, post, put, errors } = useForm(initialValues);
    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
        setIsEditMode(false);
        setCurrentBrandId(null);
    };

    const openModal = (brand = null) => {
        if (brand) {
            setIsEditMode(true);
            setCurrentBrandId(brand.id);
            setData({
                name: brand.name,
                brand_code: brand.brand_code,
                notes: brand.notes,
                status: brand.status.toString(),
            });
        } else {
            setIsEditMode(false);
            setCurrentBrandId(null);
            setData(initialValues);
        }
        setIsOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== '');
        if (allFieldsFilled) {
            if (isEditMode) {
                router.post(`/brand-update/${currentBrandId}`, data, {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                        setIsEditMode(false);
                        setCurrentBrandId(null);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            } else {
                post(route('brand-store'), {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            }
        } else {
            SwalWarning('All fields are required.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Brand List'}>
            <Head title="Brand" />
            <List openModal={openModal} brands={brands} />
            <Modal show={isOpenModal} title={isEditMode ? 'Edit Brand' : 'Create New Brand'} maxWidth='2xl' onClose={closeModal}>
                <div>
                    <form onSubmit={handleSubmit} className="p-2 mx-auto">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <label className="dark:text-gray-800" htmlFor="name">Name <span className="text-red-600">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="brand_code">Brand Code</label>
                                <input
                                    name="brand_code"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.brand_code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="dark:text-gray-800" htmlFor="notes">Notes</label>
                                <textarea
                                    name="notes"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.notes}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                                {isEditMode ? 'Update Brand' : 'Save Brand'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
