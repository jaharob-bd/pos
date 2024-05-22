import React from 'react'

const SubMenu = ({ isOpenSubMenu, subMenuHandler }) => {
    // alert(isOpenSubMenu);
    console.log(isOpenSubMenu)
    return (
        <div className={`sub_menu ${isOpenSubMenu}`}>
            <div className="closeSub" onClick={() => subMenuHandler('hide')}>
                <button className="btn btn-closes position-absolute pr-3 pt-2" />
            </div>
            <ul className="nav navbar-nav sub-menu">
                <li>
                    <a className="sub_link_name squared">
                        <span className="ml-2">** Item -1</span>
                    </a>
                </li>
                <li>
                    <a className="sub_link_name squared">
                        <span className="ml-2">** Item -2</span>
                    </a>
                </li>
                <li>
                    <a className="sub_link_name squared">
                        <span className="ml-2">** Item -3</span>
                    </a>
                </li>
                <li>
                    <a className="sub_link_name squared">
                        <span className="ml-2">** Item -4</span>
                    </a>
                </li>
                <li>
                    <a className="sub_link_name squared">
                        <span className="ml-2">** Item -5</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default SubMenu