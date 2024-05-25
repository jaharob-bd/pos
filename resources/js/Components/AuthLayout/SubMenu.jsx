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
                    <Link className="sub_link_name squared">
                        <span className="ml-2">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link className="sub_link_name squared">
                        <span className="ml-2">Varients</span>
                    </Link>
                </li>
                <li>
                    <Link className="sub_link_name squared">
                        <span className="ml-2">Attributes</span>
                    </Link>
                </li>
                <li>
                    <Link className="sub_link_name squared">
                        <span className="ml-2">Bands</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SubMenu