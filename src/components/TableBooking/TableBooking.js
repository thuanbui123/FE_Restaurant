import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './TableBooking.module.scss';
import CustomToastMessage from '~/components/CustomToastMessage';
import { request } from '~/utils/request';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

const BookingInfo = ({ data, customerName, phoneNumber, timeRange }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        return `${hours}:${minutes}`;
    };

    const handleCancelTableBooking = async ({ data }) => {
        try {
            const requestData = {
                customerId: data.customerId,
                bookingTime: data.bookingTime,
                note: 'Khách hủy đặt bàn',
            };
            await request('put', `/table-booking/cancel-table-booking/${data.id}`, requestData);
            CustomToastMessage.success('Hủy đặt bàn thành công!', () => {
                window.location.reload();
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi hủy đặt bàn. Vui lòng thử lại.';
            CustomToastMessage.error(errorMessage);
        }
    };

    const handleSelectedTable = () => {
        navigate(`/table-selection/${data.customerId}?table-booking-id=${data.id}`);
    };

    const handleCheckIn = async () => {
        try {
            await request('put', `/table-booking/check-in-reservation/${data.id}?table-id=1`);
            CustomToastMessage.success('Khách đã đến nhận bàn thành công!', () => {
                window.location.reload();
            });
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            CustomToastMessage.error(errorMessage);
        }
    };

    return (
        <div className={cx('booking-card')}>
            <div className={cx('booking-header')}>
                <span>
                    {customerName} - {phoneNumber}
                </span>
            </div>
            <div className={cx('booking-details')}>
                <div className={cx('booking-icon')}>
                    <i className="bx bx-question-mark" style={{ fontSize: '30px' }}></i>
                </div>
                <div className={cx('booking-info')}>
                    <div>
                        <i className="bx bx-time-five" style={{ marginRight: '5px' }}></i> {formatTime(timeRange)} giờ
                    </div>
                </div>
            </div>
            <div className={cx('booking-footer')}>
                <button className={cx('option-button')} onClick={toggleDropdown}>
                    ...
                </button>
                <div className={cx('dropdown-menu', { show: isDropdownOpen })}>
                    <div onClick={handleSelectedTable} className={cx('dropdown-item')}>
                        <i className="bx bx-map-pin" style={{ marginRight: '8px' }}></i>
                        Xếp bàn
                    </div>
                    <div onClick={() => handleCancelTableBooking({ data })} className={cx('dropdown-item')}>
                        <i className="bx bx-x" style={{ marginRight: '8px', color: 'red' }}></i>
                        Hủy đặt bàn
                    </div>
                </div>
                <button onClick={handleCheckIn}>Khách nhận bàn</button>
            </div>
        </div>
    );
};

function TableBooking({ data }) {
    return (
        <div className={cx('app-container')}>
            <BookingInfo
                data={data}
                customerName={data.customerName}
                phoneNumber={data.phoneNumber}
                timeRange={data.bookingTime}
            />
        </div>
    );
}

export default TableBooking;
