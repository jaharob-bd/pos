import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Select from 'react-select';

const Index = (props) => {
    const auth = props.auth;
    const [products, setProducts] = useState(props.products);
    const [suppliers, setSuppliers] = useState(props.suppliers);
    const [search, setSearch] = useState('');
    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
        variant: product.variant_prices
    }));

    // supplier options
    const supplierOptions = suppliers.map((supplier) => ({
        value: supplier.id,
        label: supplier.name
    }));
    // supplier options
    const handleChangeSupplier = (selectedOption) => {
        setSearch(selectedOption ? selectedOption.value : '');
    }

    const handleChange = (selectedOption) => {
        setSearch(selectedOption ? selectedOption.value : '');
    };

    const items = [
        // Example items
        { id: 1, name: 'Item 1', price: 100 },
        { id: 2, name: 'Item 2', price: 200 },
    ];

    const cartItems = [
        // Example cart items
        { id: 1, name: 'Item 1', qty: 2 },
        { id: 2, name: 'Item 2', qty: 1 },
    ];

    const submit = () => {
        // Submit function logic
    };
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverData, setPopoverData] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = (event, data) => {
        const rect = event.target.getBoundingClientRect();
        setPopoverPosition({ top: rect.top, left: rect.right });
        setPopoverData(data);
        setPopoverVisible(true);
    };

    const handleMouseLeave = () => {
        setPopoverVisible(false);
    };

    const CustomOption = (props) => (
        <div
            onMouseEnter={(e) => handleMouseEnter(e, props.data)}
            onMouseLeave={handleMouseLeave}
            {...props.innerProps}
            className="p-2 cursor-pointer hover:bg-gray-100"
        >
            {props.data.label}
        </div>
    );
    // ----- end variant propups -----
    return (
        <AuthenticatedLayout user={auth.user} header={''}>
            <div className="flex flex-col md:flex-row w-full h-full">
                {/* Section 1 */}
                <div className="w-full md:w-7/12 flex-grow flex">
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <Select
                                options={options}
                                onChange={(option) => console.log(option)}
                                classNamePrefix="react-select"
                                className="bg-white shadow text-lg w-full h-10 transition-shadow focus:shadow-2xl focus:outline-none"
                                placeholder="Select or Type Name ..."
                                components={{ Option: CustomOption }}
                            />
                        </div>

                        {popoverVisible && popoverData.variant.length > 0 && (
                            <div
                                id="popover-content"
                                role="tooltip"
                                className="absolute z-20 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-70 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                                style={{ top: popoverPosition.top, left: popoverPosition.left }}
                            >
                                <div className="p-3">
                                    <div className="flex">
                                        <div>
                                            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
                                                <a href="#" className="hover:underline">{popoverData.value + ' . ' + popoverData.label}</a>
                                            </p>
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                                        <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                                        <th className="border-l border-r border-b border-indigo-500">Variant</th>
                                                        <th className="border-l border-r border-b border-indigo-500">Buy Price</th>
                                                        <th className="border-l border-r border-b border-indigo-500">Sale Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        popoverData.variant.map((variant, i) => (
                                                            <tr key={variant.id} className="font-bold h-4">
                                                                <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                                <td className="pl-1 border-l border-r border-b border-indigo-500">{variant.variant_name}</td>
                                                                <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{variant.buy_price}</td>
                                                                <td className="pl-1 border-l border-r border-b border-indigo-500">{variant.sale_price}</td>
                                                            </tr>
                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div data-popper-arrow />
                            </div>
                        )}




                        <div className="h-full overflow-hidden mt-4">
                            <div className="h-full overflow-y-auto px-2">
                                {items.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                                <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                                <th className="border-l border-r border-b border-indigo-500">Product Name</th>
                                                <th className="border-l border-r border-b border-indigo-500">Unit Price</th>
                                                <th className="border-l border-r border-b border-indigo-500">Quantity</th>
                                                <th className="p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, i) => (
                                                <tr key={item.id} className="font-bold h-4">
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{item.name}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{item.price}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">1</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500"></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 2 */}
                <div className="w-full md:w-5/12 flex-grow flex px-3">
                    <div className="bg-white rounded-3xl flex flex-col w-full">
                        {cartItems.length > 0 ? (
                            <div>
                                <div className="flex-1 w-full opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                    <div className="pl-8 text-left text-lg py-4 relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                                            {cartItems.reduce((a, b) => a + (b['qty'] || 0), 0)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p>
                                        CART EMPTY!
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* general information */}
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-50 dark:border-gray-50 focus:border-blue-50 dark:focus:border-blue-50 focus:outline-none focus:ring"
                                    onChange={handleChange}
                                    placeholder="Batch No"
                                />
                            </div>
                            <div>
                                <select
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-100 dark:focus:border-blue-100 focus:outline-none focus:ring"
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select Store --</option>
                                </select>
                            </div>
                            <div className="sm:col-span-2 pb-2">
                                <Select
                                    options={supplierOptions}
                                    onChange={handleChange}
                                    classNamePrefix="react-select"
                                    placeholder="Select Supplier"
                                    className="block w-full mt-1 text-gray-900 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-100 dark:focus:border-blue-100 focus:outline-none focus:ring"
                                />

                            </div>
                        </div>
                        <table className="w-full totalCalculation">
                            <thead>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">MRP Total</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right">1000</th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">(+) VAT</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right">10</th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">(-) Discount</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right">15</th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">Total</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right">1025</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="w-full totalCalculation pl-2">
                            <thead>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Cash Received</th>
                                    <th className="border border-slate-500 text-right">10000</th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Online Banking</th>
                                    <th className="border border-slate-500 text-right"></th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">VISA/Master Card</th>
                                    <th className="border border-slate-500 text-right"></th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Change Amount </th>
                                    <th className="border border-slate-500 text-right bg-indigo-500 text-white">100</th>
                                </tr>
                            </thead>
                        </table>

                        <div className="select-none h-auto w-full text-center pt-1 pb-2 px-2">
                            <div className="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-cyan-700 py-2 px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <button onClick={() => submit()} className={"text-white text-lg w-full py-2 bg-indigo-500"}>
                                SUBMIT
                            </button>
                            {/* <button onClick={() => submit()} disabled={change < 0 || cartItems.length <= 0} className={"text-white rounded-2xl text-lg w-full py-3 focus:outline-none " + (change >= 0 && cartItems.length > 0 ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-gray-200")}>
                                SUBMIT
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
