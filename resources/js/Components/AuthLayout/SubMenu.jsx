import React from 'react'
import { Link } from '@inertiajs/react';

const SubMenu = ({ isOpenSubMenu, subMenuHandler }) => {
    return (
        <div className={`sub_menu ${isOpenSubMenu}`}>
            <div className="closeSub" onClick={() => subMenuHandler('hide')}>
                <button className="btn btn-closes position-absolute pr-3 pt-2" />
            </div>
            <ul className="nav navbar-nav sub-menu">
                <li>
                    <Link href={route('products')} className="sub_link_name squared">
                        <span className="ml-2"> Products</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('categories')} className="sub_link_name squared">
                        <span className="ml-2">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('brands')} className="sub_link_name squared">
                        <span className="ml-2">Bands</span>
                    </Link>
                </li>
                {/* <li>
                    <Link className="sub_link_name squared">
                        <span className="ml-2">Attributes</span>
                    </Link>
                </li> */}
                <h6 className="px-7 front-bold">Customer</h6>
                <li>
                    <Link href={route('customers')} className="sub_link_name squared">
                        <span className="ml-2">Customer</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('customer-groups')} className="sub_link_name squared">
                        <span className="ml-2">Customer Group</span>
                    </Link>
                </li>
                <h6 className="px-7 front-bold">Purchase</h6>
                <li>
                    <Link href={route('purchases')} className="sub_link_name squared">
                        <span className="ml-2">Purchases</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('purchase-lists')} className="sub_link_name squared">
                        <span className="ml-2">Purchases List</span>
                    </Link>
                </li>
                <h6 className="px-7 front-bold">Sales</h6>
                <li>
                    <Link href={route('purchases')} className="sub_link_name squared">
                        <span className="ml-2">Order</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('purchase-lists')} className="sub_link_name squared">
                        <span className="ml-2">Shipments</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('purchase-lists')} className="sub_link_name squared">
                        <span className="ml-2">Invoices</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('purchase-lists')} className="sub_link_name squared">
                        <span className="ml-2">Refunds</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('purchase-lists')} className="sub_link_name squared">
                        <span className="ml-2">Transactions</span>
                    </Link>
                </li>
                <h6 className="px-7 front-bold">Inventory</h6>
                <li>
                    <Link href={route('stocks')} className="sub_link_name squared">
                        <span className="ml-2">Stock</span>
                    </Link>
                </li>
                <li>
                    <Link href={route('stock-movements')} className="sub_link_name squared">
                        <span className="ml-2">Stock Movement</span>
                    </Link>
                </li>
                <h6 className="px-7 front-bold">Supplier</h6>
                <li>
                    <Link href={route('suppliers')} className="sub_link_name squared">
                        <span className="ml-2">Supplier</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SubMenu