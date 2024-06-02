import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import EditSideBar from './Partials/EditSideBar';
import { EditImageUpload } from './Partials/EditImageUpload';
// const BASE_URL = process.env.REACT_APP_BASE_URL;

const Edit = (props) => {
    const [user, setUser] = useState(props.auth.user);
    const [initial, setInitial] = useState(props.product);
    const { data, setData, reset, post } = useForm(initial);

    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };
        if (name === 'name' || name === 'url_key') {
            updatedData.url_key = createSlug(value);
        }
        setData(updatedData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch(`/product-update/${props.product.id}`, data, {
            preserveScroll: true,
            onSuccess: () => { // successfully msg
                setData(data);
            },
            onError: (errors) => { // error msg

            },
        });
    };





    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + data.name} />
            <div className="container w-full flex flex-wrap mx-auto px-1 pt-1 lg:pt-1">
                <EditSideBar />
                <section className="w-full lg:w-5/6">
                    <h2 id="general" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">General </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Name <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="name"
                                        value={data?.name || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Url Key <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="url_key"
                                        value={data?.url_key || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        SKU <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="sku"
                                        value={data?.sku || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Product Code <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        name="product_code"
                                        type="text"
                                        value={data?.product_code || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <hr className="bg-gray-300 my-3" />
                        <h2 id="description" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Description</h2>
                        <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textarea">
                                        Short Description
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea
                                        className="form-textarea block w-full focus:bg-white"
                                        name="short_description"
                                        value={data?.short_description || ''} rows={4}
                                        onChange={handleChange}
                                    />
                                    <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textarea">
                                        Description
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea
                                        className="form-textarea block w-full focus:bg-white"
                                        name="description"
                                        value={data?.description || ''} rows={8}
                                        onChange={handleChange}
                                    />
                                    <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                                </div>
                            </div>
                            <div className="md:flex md:datas-center">
                                <div className="md:w-1/3" />
                                <div className="md:w-2/3">
                                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                   <EditImageUpload { ...props}/>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="price" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Price</h2>
                    <div className="p-2 mt-3 lg:mt-0 rounded shadow bg-gray-100">
                        <form>
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div className="min-[320px]:text-center max-[600px]:bg-white-300 flex-grow w-full md:w-1/2 p-1">
                                    <div className="flex justify-start datas-center mb-2">
                                        <button type="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex datas-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                            <p className="text-sm font-medium leading-none text-white">Add Product Variant Price</p>
                                        </button>
                                    </div>
                                    <table className="table-fixed w-full border border-gray-300 pt-2">
                                        <thead>
                                            <tr className="border-b border-gray-300">
                                                <th className="border-r border-gray-300">Variant</th>
                                                <th className="border-r border-gray-300">Buy Price</th>
                                                <th className="border-r border-gray-300">Sale Price</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-300">
                                                <td className="border-r border-gray-300">Witchy Woman</td>
                                                <td className="border-r border-gray-300">The Eagles</td>
                                                <td className="border-r border-gray-300">1972</td>
                                                <td className="border-r border-gray-300">
                                                    <i className="ri-close-circle-fill" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-r border-gray-300">Witchy Woman</td>
                                                <td className="border-r border-gray-300">The Eagles</td>
                                                <td className="border-r border-gray-300">1972</td>
                                                <td className="border-r border-gray-300">
                                                    <i className="ri-close-circle-fill" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="min-[320px]:text-center max-[600px]:bg-sky-300 flex-grow w-full md:w-1/2 p-1">
                                    <div className="flex justify-end datas-center mb-2">
                                        <button type="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex datas-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                            <p className="text-sm font-medium leading-none text-white">Add Customer Group Price</p>
                                        </button>
                                    </div>
                                    <table className="table-fixed w-full border border-gray-300">
                                        <thead>
                                            <tr className="border-b border-gray-300">
                                                <th className="border-r border-gray-300">Cust. Group</th>
                                                <th className="border-r border-gray-300">Qty</th>
                                                <th className="border-r border-gray-300">Price</th>
                                                <th />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-gray-300">
                                                <td className="border-r border-gray-300">Witchy Woman</td>
                                                <td className="border-r border-gray-300">The Eagles</td>
                                                <td className="border-r border-gray-300">1972</td>
                                                <td className="border-r border-gray-300">
                                                    <i className="ri-close-circle-fill" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-r border-gray-300">Witchy Woman</td>
                                                <td className="border-r border-gray-300">The Eagles</td>
                                                <td className="border-r border-gray-300">1972</td>
                                                <td className="border-r border-gray-300">
                                                    <i className="ri-close-circle-fill" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* end */}
                        </form>
                    </div>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="videos" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Videos</h2>
                    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                        <blockquote className="border-l-4 border-indigo-600 italic my-4 pl-8 md:pl-12">Final confirmation disclaimer message etc</blockquote>
                        <div className="pt-8">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="button">
                                Save
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4" type="button">
                                Additional Action
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Additional Action
                            </button>
                        </div>
                    </div>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="others" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Others</h2>
                    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                        <blockquote className="border-l-4 border-indigo-600 italic my-4 pl-8 md:pl-12">Final confirmation disclaimer message etc</blockquote>
                        <div className="pt-8">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="button">
                                Save
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4" type="button">
                                Additional Action
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Additional Action
                            </button>
                        </div>
                    </div>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="settings" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Settings</h2>
                    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                        <blockquote className="border-l-4 border-indigo-600 italic my-4 pl-8 md:pl-12">Final confirmation disclaimer message etc</blockquote>
                        <div className="pt-8">
                            <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="button">
                                Save
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4" type="button">
                                Additional Action
                            </button>
                            <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                                Additional Action
                            </button>
                        </div>
                    </div>
                </section>
                <div className="w-full lg:w-5/6 lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
                    <span className="text-base text-indigo-600 font-bold">&lt;</span> <a href="#" className="text-base md:text-sm text-indigo-600 font-bold no-underline hover:underline">Back link</a>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit