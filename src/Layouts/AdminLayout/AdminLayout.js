import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { useAuth } from '~/utils/AuthUtil/Auth';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const auth = useAuth();
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [showSubmenuIndex, setShowSubmenuIndex] = useState(null);
    const [username, setUsername] = useState('');
    const [img, setImg] = useState('');
    // const arrowRefs = useRef([]); // To track arrows

    // function capitalizeFirstLetterOfEachWord(str) {
    //     if (!str) {
    //         return null;
    //     }
    //     return str
    //         .replace(/"/g, '')
    //         .split(' ') // Tách chuỗi thành mảng các từ
    //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu mỗi từ
    //         .join(' '); // Ghép lại thành chuỗi
    // }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const username = user.username;
        setUsername(username);
        const img = user.img;
        setImg(img);
    }, []);

    // Toggle sidebar open/close
    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    // Handle submenu toggling by index
    const toggleSubmenu = (index) => {
        setShowSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const logout = () => {
        auth.logout();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar', { close: isSidebarClosed })}>
                <div className={cx('logo-details')}>
                    <i className={cx('bx', 'bxl-react')}></i>
                    <span className={cx('logo-name')}>Groups 11</span>
                </div>
                <ul className={cx('nav-links')}>
                    <li>
                        <Link to="/admin-employee">
                            <i className={cx('bx', 'bx-grid-alt')}></i>
                            <span className={cx('link_name')}>Thống kê</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin-employee" className={cx('link_name')}>
                                    Thống kê
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 0 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin-employee">
                                <i className={cx('bx', 'bx-receipt')}></i>
                                <span className={cx('link_name')}>Hóa đơn</span>
                            </Link>
                            <i className={cx('bx', 'bx-chevron-down', 'arrow')} onClick={() => toggleSubmenu(0)}></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/admin-employee" className={cx('link_name')}>
                                    Hóa đơn
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Đơn hiện thời</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Đơn nhập nguyên liệu</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Lịch sử đơn hàng</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 1 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin-employee">
                                <i className={cx('bx', 'bx-calendar-check')}></i>
                                <span className={cx('link_name')}>Đặt bàn</span>
                            </Link>
                            <i className={cx('bx', 'bx-chevron-down', 'arrow')} onClick={() => toggleSubmenu(1)}></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/tables" className={cx('link_name')}>
                                    Đặt bàn
                                </Link>
                            </li>
                            <li>
                                <Link to="/tables">Sơ đồ bàn</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Lịch đặt bàn</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Lịch sử đặt bàn</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 2 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/foods">
                                <i className={cx('bx', 'bx-bowl-hot')}></i>
                                <span className={cx('link_name')}>Mặt hàng</span>
                            </Link>
                            <i className={cx('bx', 'bx-chevron-down', 'arrow')} onClick={() => toggleSubmenu(2)}></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/foods" className={cx('link_name')}>
                                    Mặt hàng
                                </Link>
                            </li>
                            <li>
                                <Link to="/foods">Danh sách mặt hàng</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Danh mục mặt hàng</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 3 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin-employee">
                                <i className={cx('bx', 'bx-baguette')}></i>
                                <span className={cx('link_name')}>Nguyên liệu</span>
                            </Link>
                            <i className={cx('bx', 'bx-chevron-down', 'arrow')} onClick={() => toggleSubmenu(3)}></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/admin-employee" className={cx('link_name')}>
                                    Nguyên liệu
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Danh sách nguyên liệu</Link>
                            </li>
                            <li>
                                <Link to="/admin-employee">Danh mục nguyên liệu</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/combos">
                            <i className={cx('bx', 'bx-copyright')}></i>
                            <span className={cx('link_name')}>Combo</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/combos" className={cx('link_name')}>
                                    Combo
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin-employee">
                            <i className={cx('bx', 'bx-group')}></i>
                            <span className={cx('link_name')}>Nhân viên</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin-employee" className={cx('link_name')}>
                                    Nhân viên
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin-customer">
                            <i className={cx('bx', 'bx-id-card')}></i>
                            <span className={cx('link_name')}>Khách hàng</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin-customer" className={cx('link_name')}>
                                    Khách hàng
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin-account">
                            <i className={cx('bx', 'bxs-user-account')}></i>
                            <span className={cx('link_name')}>Tài khoản</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin-account" className={cx('link_name')}>
                                    Tài khoản
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin-employee">
                            <i className={cx('bx', 'bx-store')}></i>
                            <span className={cx('link_name')}>Nhà cung cấp</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin-employee" className={cx('link_name')}>
                                    Nhà cung cấp
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={cx('profile-details')}>
                            <div className={cx('profile-content')}>
                                <img src={img} alt="profile" />
                            </div>
                            <div className={cx('name-job')}>
                                <div className={cx('profile_name')}>{username}</div>
                            </div>
                            <i className={cx('bx', 'bx-log-out')} onClick={logout}></i>
                        </div>
                    </li>
                </ul>
            </div>
            <section className={cx('container-section')}>
                <div className={cx('container-content')}>
                    <i className={cx('bx', 'bx-menu', 'menu')} onClick={toggleSidebar}></i>
                    <div className={cx('container')}>{children}</div>
                </div>
            </section>
            <section className={cx('footer')}>
                <h2>
                    @Copyright <b>Groups 11 - Admin.</b> All Rights Reserved
                </h2>
            </section>
        </div>
    );
}

export default AdminLayout;
