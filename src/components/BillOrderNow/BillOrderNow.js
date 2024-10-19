import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import classNames from 'classnames/bind';
import style from './BillOrderNow.module.scss';
import { request } from '~/utils/request';
import { ToastContainer } from 'react-toastify';
import CustomToastMessage from '~/components/CustomToastMessage';

const cx = classNames.bind(style);

function BillOrderNow({ data }) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        document.title = 'Đơn hiện tại';
    }, []); // Added empty dependency array to avoid unnecessary calls

    const handleDetailClick = () => {
        navigate(`/bill-order-detail/${data.id}`); // Navigate to detail page with order ID
    };

    const handleCancelOrder = async () => {
        const requestData = {
            note: 'Khách hủy đơn hàng',
        };

        try {
            await request('put', `/employee-order/cancel-order?order-id=${data.id}`, requestData);
            CustomToastMessage.success('Đơn hàng đã được hủy thành công!', () => {
                window.location.reload();
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.';
            CustomToastMessage.error(errorMessage);
        }
    };

    const handleSelectedTable = () => {
        //Chuyển sang trang chọn bàn
    };

    return (
        <div className={cx('table-order-menu')}>
            <ToastContainer />
            <div className={cx('table-info')}>
                <div className={cx('table-details')}>
                    <span>
                        Đơn hàng {data.id} {data.customerName}
                    </span>
                </div>
            </div>

            <div className={cx('menu-container')}>
                <button className={cx('menu-button')} onClick={toggleMenu}>
                    ...
                </button>
                {showMenu && (
                    <div className={cx('dropdown-menu')}>
                        <ul>
                            <li onClick={handleDetailClick}>
                                <span className={cx('menu-icon')}>📝</span> Chi tiết
                            </li>
                            <li onClick={() => handleSelectedTable}>
                                <span className={cx('menu-icon')}>🔄</span> Chọn bàn
                            </li>
                            <li onClick={handleCancelOrder}>
                                <span className={cx('menu-icon')}>❌</span> Hủy đơn
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BillOrderNow;
