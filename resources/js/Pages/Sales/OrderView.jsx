import React, { useRef, useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { OrderViewActionButton } from './Partials/OrderViewActionButton';
import { OrderViewSection01 } from './Partials/OrderViewSection01';
import { OrderViewSection02 } from './Partials/OrderViewSection02';
import { calculateSubTotal } from '../../Utils/TransCalculation';
import { calculateDiscount } from '../../Utils/TransCalculation';
import { calculateVAT } from '../../Utils/TransCalculation';
import { calculateGrandTotal } from '../../Utils/TransCalculation';

export default function OrderView({ auth, sales }) {
    const { t } = useTranslation();
    const [saleData, setSaleData] = useState(sales);
    const [customerData, setCustomerData] = useState(sales.customer_details);
    const subTotal = useMemo(() => calculateSubTotal(saleData.sale_details), [saleData]);
    const discountAmount = useMemo(() => calculateDiscount(subTotal, saleData.discount_type, saleData.discount_amt), [subTotal, saleData]);
    const vatAmount = useMemo(() => calculateVAT(subTotal, discountAmount, saleData.VAT_type, saleData.VAT_amt), [subTotal, discountAmount, saleData]);
    const totalAmount = calculateGrandTotal(subTotal, discountAmount, vatAmount);

    return (
        <AuthenticatedLayout user={auth.user} header={'sales List'}>
            <Head title="Order View" />
            <div className="mx-auto sm:px-4">
                <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                    <p className="text-xl text-gray-800 dark:text-white font-bold w-full sm:w-auto">
                        View Orders
                    </p>
                    <OrderViewActionButton
                        saleData={saleData}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* section 1 product section */}
                    <OrderViewSection01
                        saleData={saleData}
                        subTotal={subTotal}
                        discountAmount={discountAmount}
                        vatAmount={vatAmount}
                        totalAmount={totalAmount}

                    />
                    {/* section 2 info section */}
                    <OrderViewSection02
                        saleData={saleData}
                        customerData={customerData}
                    />
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
