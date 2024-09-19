import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import profileImage from './avatarDefault.jpg';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [showSubmenuIndex, setShowSubmenuIndex] = useState(null);

    const arrowRefs = useRef([]); // To track arrows

    // Toggle sidebar open/close
    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
    };

    // Handle submenu toggling by index
    const toggleSubmenu = (index) => {
        setShowSubmenuIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            <div className={cx('sidebar', { close: isSidebarClosed })}>
                <div className={cx('logo-details')}>
                    <i className={cx('bx', 'bxl-react')}></i>
                    <span className={cx('logo-name')}>Groups 11</span>
                </div>
                <ul className={cx('nav-links')}>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-grid-alt')}></i>
                            <span className={cx('link_name')}>Dashboard</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Category
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 0 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin">
                                <i className={cx('bx', 'bx-collection')}></i>
                                <span className={cx('link_name')}>Category</span>
                            </Link>
                            <i className={cx('bx', 'bx-chevron-down', 'arrow')} onClick={() => toggleSubmenu(0)}></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Category
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin">HTML & CSS</Link>
                            </li>
                            <li>
                                <Link to="/admin">JavaScript</Link>
                            </li>
                            <li>
                                <Link to="/admin">PHP & MySQL</Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 1 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin">
                                <i className={cx('bx', 'bx-book-bookmark')}></i>
                                <span className={cx('link_name')}>Posts</span>
                            </Link>
                            <i
                                className={cx('bx', 'bx-chevron-down', 'arrow')}
                                onClick={() => toggleSubmenu(1)} // Toggle submenu for index 1
                                ref={(el) => (arrowRefs.current[1] = el)}
                            ></i>
                        </div>
                        <ul className={cx('sub-menu')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Posts
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin">Web design</Link>
                            </li>
                            <li>
                                <Link to="/admin">Card design</Link>
                            </li>
                            <li>
                                <Link to="/admin">Login form</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-pie-chart-alt-2')}></i>
                            <span className={cx('link_name')}>Analytics</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Analytics
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-line-chart')}></i>
                            <span className={cx('link_name')}>Chart</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Chart
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={cx(showSubmenuIndex === 2 ? 'showMenu' : '')}>
                        <div className={cx('icon-link')}>
                            <Link to="/admin">
                                <i className={cx('bx', 'bx-plug')}></i>
                                <span className={cx('link_name')}>Plugins</span>
                            </Link>
                            <i
                                className={cx('bx', 'bx-chevron-down', 'arrow')}
                                onClick={() => toggleSubmenu(2)} // Toggle submenu for index 2
                                ref={(el) => (arrowRefs.current[2] = el)}
                            ></i>
                        </div>
                        <ul className={cx('sub-menu', { showMenu: showSubmenuIndex === 2 })}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Plugins
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin">UI Face</Link>
                            </li>
                            <li>
                                <Link to="/admin">Pigments</Link>
                            </li>
                            <li>
                                <Link to="/admin">Box Icons</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-compass')}></i>
                            <span className={cx('link_name')}>Explore</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Explore
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-history')}></i>
                            <span className={cx('link_name')}>History</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    History
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/admin">
                            <i className={cx('bx', 'bx-cog')}></i>
                            <span className={cx('link_name')}>Setting</span>
                        </Link>
                        <ul className={cx('sub-menu', 'blank')}>
                            <li>
                                <Link to="/admin" className={cx('link_name')}>
                                    Setting
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div className={cx('profile-details')}>
                            <div className={cx('profile-content')}>
                                <img src={profileImage} alt="profile" />
                            </div>
                            <div className={cx('name-job')}>
                                <div className={cx('profile_name')}>Admin</div>
                            </div>
                            <i className={cx('bx', 'bx-log-out')}></i>
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
        </>
    );
}

export default AdminLayout;
