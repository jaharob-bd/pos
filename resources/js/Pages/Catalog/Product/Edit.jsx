import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const Edit = (props) => {
    const [user, setUser] = useState(props.auth.user); // auth state
    const [item, setItem] = useState(props.product); // item or product state
    const [selectedImages, setSelectedImages] = useState([]);
    const initialValues = { name: '', url_key: '', sku: '', product_code: '', short_description: '', description: '' }
    const { data, setData, processing, reset, post, errors } = useForm(initialValues);
    console.log(item);
    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    };

    const handleChange_old = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'name' || name === 'url_key') {
            updatedData.url_key = createSlug(value);
        }
        setData(updatedData);
        // console.log("url_key", updatedData.url_key);
    };

    const handleChange = (e) => {
        // Update the state with the new value
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
        console.log(item);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== '');
        if (allFieldsFilled) {
            post(route('product-store'), {
                preserveScroll: true,
                onSuccess: () => { // successfully msg
                    reset();
                    setIsOpenModal(false);
                    setData(initialValues);
                },
                onError: (errors) => { // error msg

                },
            });
        } else {
            Swal.fire({
                text: 'Required all fields.',
                icon: 'warning',
                timer: 2000, // 5000 milliseconds (5 seconds)
                timerProgressBar: true, // Display a progress bar indicating the time remaining
            });
        }
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files.slice(0, 3)); // Allow only up to 4 images
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + item.name} />
            <div className="container w-full flex flex-wrap mx-auto px-1 pt-1 lg:pt-1">
                <div className="w-full lg:w-1/6 px-1 text-xl text-gray-800 leading-normal">
                    <p className="text-base font-bold py-2 lg:pb-6 text-gray-700"><Link href={route('products')}><i class="ri-arrow-left-circle-line"></i></Link> Product Edit</p>
                    <div className="block lg:hidden sticky inset-0">
                        <button id="menu-toggle" className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-indigo-600 appearance-none focus:outline-none">
                            <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full sticky inset-0 hidden max-h-90 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-1 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" style={{ top: '6em' }} id="menu-content">
                        <ul className="list-reset py-1 md:py-0">
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-indigo-600">
                                <a href="#general" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">General</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#description" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Description</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#image" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Image</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#price" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Price</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#videos" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Videos</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#others" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Others</span>
                                </a>
                            </li>
                            <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                                <a href="#settings" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                                    <span className="pb-1 md:pb-0 text-sm">Settings</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
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
                                        value={item?.name || ''}
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
                                        value={item.url_key}
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
                                        value={item.sku}
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
                                        value={item.product_code}
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
                                        value={item.short_description} rows={4}
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
                                        value={item.description} rows={8}
                                        onChange={handleChange}
                                    />
                                    <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                                </div>
                            </div>
                            <div className="md:flex md:items-center">
                                <div className="md:w-1/3" />
                                <div className="md:w-2/3">
                                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded" type="button">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="image" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Image</h2>
                    <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                        <form>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-2">
                                {/* Upload section */}
                                <div className="mt-1 flex justify-center px-2 pt-2 pb-2 border-2 border-black border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-black">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} />
                                            </label>
                                            <p className="pl-1 text-black">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-black">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                                {/* Preview section */}
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="mt-1 flex justify-center px-2 pt-2 pb-2 border-2 border-black border-dashed rounded-md">
                                        <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="h-24 w-24 object-cover" />
                                    </div>
                                ))}
                                {/* Additional divs if there are fewer than 4 images */}
                                {Array.from({ length: 3 - selectedImages.length }).map((_, index) => (
                                    <div key={index} className="mt-1 flex justify-center px-14 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
                                        <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                ))}
                                <div className="mt-1 flex justify-center pl-0 px-14 pt-10 pb-6">
                                    <button type="button">
                                        <span className="text-5xl"><i class="ri-upload-cloud-line"></i></span>
                                    </button>

                                </div>
                            </div>
                            {/* <div className="md:flex md:items-center">
                                <div className="md:w-1/3" />
                                <div className="md:w-2/3">
                                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                                        Save
                                    </button>
                                </div>
                            </div> */}
                        </form>
                    </div>
                    <hr className="bg-gray-300 my-3" />
                    <h2 id="price" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Price</h2>
                    <div className="p-2 mt-3 lg:mt-0 rounded shadow bg-gray-100">
                        <form>
                            <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div class="min-[320px]:text-center max-[600px]:bg-white-300 flex-grow w-full md:w-1/2 p-1">
                                    <div class="flex justify-start items-center mb-2">
                                        <button type="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                            <p class="text-sm font-medium leading-none text-white">Add Product Variant Price</p>
                                        </button>
                                    </div>
                                    <table class="table-fixed w-full border border-gray-300 pt-2">
                                        <thead>
                                            <tr class="border-b border-gray-300">
                                                <th class="border-r border-gray-300">Variant</th>
                                                <th class="border-r border-gray-300">Buy Price</th>
                                                <th class="border-r border-gray-300">Sale Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-b border-gray-300">
                                                <td class="border-r border-gray-300">Witchy Woman</td>
                                                <td class="border-r border-gray-300">The Eagles</td>
                                                <td class="border-r border-gray-300">1972</td>
                                                <td class="border-r border-gray-300">
                                                    <i class="ri-close-circle-fill"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="border-r border-gray-300">Witchy Woman</td>
                                                <td class="border-r border-gray-300">The Eagles</td>
                                                <td class="border-r border-gray-300">1972</td>
                                                <td class="border-r border-gray-300">
                                                    <i class="ri-close-circle-fill"></i>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="min-[320px]:text-center max-[600px]:bg-sky-300 flex-grow w-full md:w-1/2 p-1">
                                    <div class="flex justify-end items-center mb-2">
                                        <button type="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 inline-flex items-start justify-start px-6 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                                            <p class="text-sm font-medium leading-none text-white">Add Customer Group Price</p>
                                        </button>
                                    </div>
                                    <table class="table-fixed w-full border border-gray-300">
                                        <thead>
                                            <tr class="border-b border-gray-300">
                                                <th class="border-r border-gray-300">Cust. Group</th>
                                                <th class="border-r border-gray-300">Qty</th>
                                                <th class="border-r border-gray-300">Price</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="border-b border-gray-300">
                                                <td class="border-r border-gray-300">Witchy Woman</td>
                                                <td class="border-r border-gray-300">The Eagles</td>
                                                <td class="border-r border-gray-300">1972</td>
                                                <td class="border-r border-gray-300">
                                                    <i class="ri-close-circle-fill"></i>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="border-r border-gray-300">Witchy Woman</td>
                                                <td class="border-r border-gray-300">The Eagles</td>
                                                <td class="border-r border-gray-300">1972</td>
                                                <td class="border-r border-gray-300">
                                                    <i class="ri-close-circle-fill"></i>
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