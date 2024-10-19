import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './BillPage.module.scss';
import { useLocation } from 'react-router-dom';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(style);

const BillPage = () => {
    const location = useLocation();
    const { billData } = location.state || {};
    const [name, setName] = useState([]);

    const fetchDataApi = async () => {
        try {
            const response = await request('get', `/employees/find-one-by-account-id?query=${accountId}`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const employee = await fetchDataApi();
            if (employee) {
                setName(employee.name);
            }
            console.log(employee);
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!billData) {
        return <div>Không có dữ liệu hóa đơn</div>;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    const accountId = user.id;

    return (
        <div
            className={cx('bill-container')}
            style={{ maxWidth: '600px', margin: 'auto', marginTop: '30px', fontFamily: 'Arial, sans-serif' }}
        >
            <ToastContainer />
            <div style={{ textAlign: 'center' }}>
                <h2>Quán nhậu tự do</h2>
                <p>Nguyễn Hữu Thọ - Linh Đàm</p>
                <p>Hot Line: *1986 nhánh 110</p>
                <h3>HÓA ĐƠN THANH TOÁN</h3>
            </div>

            <div>
                <p>
                    Ngày in: {billData.dateOrder} - Giờ vào: {billData.dateOrder}
                </p>
                <p>Ngày thanh toán: {billData.datePayment}</p>
                <p>
                    Khu: {billData.location} - Bàn: {billData.tableCode}
                </p>
                <p>Thu ngân: {name}</p>
                <p>Khách hàng: {billData.customerName}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Sản phẩm</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Đơn giá</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Số lượng</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '8px' }}>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {billData.foodOrdered.map((item, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{item.foodName}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{item.totalPrice} ₫</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{item.quantity}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                                {item.quantity * item.totalPrice} ₫
                            </td>
                        </tr>
                    ))}

                    {/* Hiển thị thông tin về comboOrdered */}
                    {billData.comboOrdered.map((combo, index) => (
                        <tr key={index}>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{combo.comboName}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{combo.totalPrice} ₫</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>{combo.quantity}</td>
                            <td style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                                {combo.totalPrice * combo.quantity} ₫
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3" style={{ padding: '8px', textAlign: 'right' }}>
                            Tổng cộng
                        </td>
                        <td style={{ padding: '8px', textAlign: 'right' }}>{billData.totalPrice} ₫</td>
                    </tr>
                </tfoot>
            </table>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <p>Cảm ơn quý khách - Hẹn gặp lại</p>
            </div>
        </div>
    );
};

export default BillPage;
