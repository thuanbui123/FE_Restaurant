import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import CustomModal from '~/components/CustomModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import DynamicForm from '~/components/DynamicForm';
import { ToastContainer } from 'react-toastify';
import style from './AddTableBooking.module.scss';
import CustomToastMessage from '~/components/CustomToastMessage';
import { useEffect, useState } from 'react';
import { request } from '~/utils/request';

library.add(faPlus);

const cx = classNames.bind(style);

function AddTableBooking() {
    const buttonStyle = {
        letterSpacing: 'normal',
        borderRadius: '5px',
        fontSize: '16px',
        width: '50px',
        textAlign: 'center',
    };

    const addButtonStyle = {
        padding: '8px 20px',
        fontSize: '16px',
        borderRadius: '6px',
        marginTop: '10px',
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const initialOrderData = {
        customerId: '',
        bookingTime: '',
        note: '',
    };

    const [customers, setCustomers] = useState([]);

    const callCustomerApi = async () => {
        try {
            const response = await request('get', `/customers/find-all`);
            setCustomers(response.data);
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        callCustomerApi();
    }, []);

    const fieldsConfig = [
        {
            name: 'customerId',
            label: 'Khách Hàng',
            placeholder: 'Chọn Khách Hàng',
            type: 'select',
            required: true,
            options: customers.map((customer) => ({
                label: customer.name,
                value: customer.id,
            })),
        },
        {
            name: 'bookingTime',
            label: 'Giờ đặt bàn',
            placeholder: 'Giờ đặt bàn',
            type: 'time',
            required: true,
        },
        {
            name: 'note',
            label: 'Ghi chú',
            placeholder: 'Nhập ghi chú',
            type: 'text',
            required: true,
        },
    ];

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/table-booking/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Đặt bàn thành công', () => {
                window.location.reload(); // Reload trang sau khi toast đóng
            });
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <Button
                    style={{ ...buttonStyle, marginRight: '50px' }}
                    variant="primary"
                    size="sm"
                    onClick={() => setIsOpen(true)}
                >
                    <FontAwesomeIcon icon="plus" />
                </Button>
            </div>
            <CustomModal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                contentLabel="Đặt bàn cho khách"
                footer={
                    <>
                        <Button
                            style={{
                                ...addButtonStyle,
                                backgroundColor: '#007bff',
                                color: '#fff',
                                marginRight: '20px',
                            }}
                            variant="primary"
                            size="sm"
                            onClick={() => handleSave()}
                        >
                            <FontAwesomeIcon icon="save" />
                        </Button>
                        <Button
                            style={{
                                ...addButtonStyle,
                                backgroundColor: '#6c757d',
                                color: '#fff',
                                marginRight: '28px',
                            }}
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            <FontAwesomeIcon icon="times" />
                        </Button>
                    </>
                }
            >
                <DynamicForm fieldsConfig={fieldsConfig} initialData={initialOrderData} onChange={handleFormChange} />
            </CustomModal>
            <ToastContainer />
        </div>
    );
}

export default AddTableBooking;
