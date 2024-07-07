import React, { useState, useEffect, forwardRef, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import ReactToPrint from 'react-to-print';
import PrintComponent from '@/Components/PrintComponent';

export default function View({ auth, purchases }) {
    const componentRef = useRef();
    const [purchaseData, setPurchaseData] = useState(purchases);
    console.log(purchaseData);

    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user} header={'Purchases List'}>
            <Head title="Purchase View" />
            <div className="mx-auto sm:px-2">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md overflow-hidden">
                        <div>
                            <ReactToPrint
                                trigger={() => (
                                    <button
                                        className="select-none rounded-lg bg-amber-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        <i className="ri-printer-line"></i>
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                            <div ref={componentRef} className="print-container">
                                <div className="max-w-3xl mx-auto p-6 my-4" id="invoice">
                                    <div className="grid grid-cols-2 items-center">
                                        <div>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="company-logo" height={100} width={100} />
                                        </div>
                                        <div className="text-right">
                                            <p>
                                                Tailwind Inc.
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                sales@tailwindcss.com
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                +41-442341232
                                            </p>
                                            <p className="text-gray-500 text-sm mt-1">
                                                VAT: 8657671212
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center mt-2">
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                Bill to :
                                            </p>
                                            <p className="text-gray-500">
                                                {purchaseData.supplier.name}
                                                <br />
                                                {purchaseData.supplier.address}
                                            </p>
                                            <p className="text-gray-500">
                                                {purchaseData.supplier.email}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className>
                                                Invoice number:
                                                <span className="text-gray-500">
                                                    {purchaseData.purchase_uid}
                                                </span>
                                            </p>
                                            <p>
                                                Invoice date: <span className="text-gray-500">
                                                    {purchaseData.purchase_date}
                                                </span>
                                                <br />
                                                Due date:<span className="text-gray-500">31/07/2023</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-mx-4 mt-2 flow-root sm:mx-0">
                                        <table className="min-w-full">
                                            <colgroup>
                                                <col className="w-full sm:w-1/2" />
                                                <col className="sm:w-1/6" />
                                                <col className="sm:w-1/6" />
                                                <col className="sm:w-1/6" />
                                            </colgroup>
                                            <thead className="border-b border-gray-300 text-gray-900">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                                                        Quantity</th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    purchaseData.purchase_chds.map((item, index) => (
                                                        <tr key={index} className="border-b border-gray-200">
                                                            <td className="max-w-0 py-2 pl-2 pr-2 text-sm sm:pl-0">
                                                                <div className="font-medium text-gray-900">
                                                                    {item.product_name} {item.variant_name}
                                                                </div>
                                                            </td>
                                                            <td className="hidden px-1 py-2 text-right text-sm text-gray-500 sm:table-cell">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="hidden px-2 py-2 text-right text-sm text-gray-500 sm:table-cell">
                                                                ${item.price}
                                                            </td>
                                                            <td className="py-2 pl-1 pr-2 text-right text-sm text-gray-500 sm:pr-0">
                                                                ${item.quantity * item.price}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Subtotal
                                                    </th>
                                                    <th scope="row" className="pl-6 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden">Subtotal</th>
                                                    <td className="pl-3 pr-6 pt-6 text-right text-sm text-gray-500 sm:pr-0">$10,500.00</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Discount
                                                    </th>
                                                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Discount</th>
                                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">- 10%</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden pl-4 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0">Tax</th>
                                                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden">Tax</th>
                                                    <td className="pl-3 pr-6 pt-4 text-right text-sm text-gray-500 sm:pr-0">$1,050.00</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} className="hidden pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Payment Details : </th>
                                                    <th scope="row" className="hidden pl-4 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0">Total
                                                    </th>
                                                    <th scope="row" className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden">Total</th>
                                                    <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">$11,550.00</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <table className="border border-gray-300">
                                            <thead className="border-b border-gray-300">
                                                <tr>
                                                    <th scope="col" className="text-left font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">Payment ID</th>
                                                    <th scope="col" className="text-center text-sm font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">Amount</th>
                                                    <th scope="col" className="text-center text-sm font-medium text-gray-900 sm:table-cell sm:pl-0">Payment Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {purchaseData.payment_details.map((method, index) => (
                                                    <tr key={index} className="px-2 py-2 border-b border-gray-300">
                                                        <td className="text-sm font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">
                                                            {method.payment_uid}
                                                        </td>
                                                        <td className="px-2 py-2 text-center text-sm text-gray-500 sm:table-cell sm:pl-0 border-r border-gray-300">
                                                            {method.payment_amt}
                                                        </td>
                                                        <td className="px-2 py-2 text-right text-sm text-gray-500 sm:table-cell sm:pl-0">
                                                            {method.payment_date}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                    </div>
                                    {/* <div className="bottom-0 w-full border-t-2 pt-2 text-xs text-gray-500 items-center">
                                        Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
}
