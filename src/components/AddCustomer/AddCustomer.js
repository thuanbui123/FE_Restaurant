import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import CustomModal from '../CustomModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import DynamicForm from '../DynamicForm';
import { ToastContainer } from 'react-toastify';
import style from './AddCustomer.module.scss';
import CustomToastMessage from '~/components/CustomToastMessage';
import { useEffect, useState } from 'react';
import { request } from '~/utils/request';

library.add(faPlus);

const cx = classNames.bind(style);

function AddCustomer() {
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

    const initialEmployeeData = {
        code: '',
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        accountId: '',
    };

    const [accounts, setAccounts] = useState([]);

    const callAccountApi = async () => {
        try {
            const response = await request('get', `/account/get-accounts-user`);
            setAccounts(response.data);
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        callAccountApi();
    }, []);

    const fieldsConfig = [
        { name: 'code', label: 'Mã khách hàng', placeholder: 'Nhập mã khách hàng', type: 'text', required: true },
        { name: 'name', label: 'Tên khách hàng', placeholder: 'Nhập tên khách hàng', type: 'text', required: true },
        {
            name: 'phoneNumber',
            label: 'Số điện thoại',
            placeholder: 'Nhập số điện thoại',
            type: 'text',
            required: true,
        },
        { name: 'email', label: 'Email', placeholder: 'Nhập email', type: 'email', required: true },
        { name: 'address', label: 'Địa chỉ', placeholder: 'Nhập địa chỉ', type: 'text' },
        {
            name: 'accountId',
            label: 'Tài khoản',
            placeholder: 'Chọn tài khoản',
            type: 'select',
            required: true,
            options: accounts.map((account) => ({
                label: account.username,
                value: account.id,
            })),
        },
    ];

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/customers/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Thêm khách hàng thành công', () => {
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
                contentLabel="Thêm khách hàng"
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
                <DynamicForm
                    fieldsConfig={fieldsConfig}
                    initialData={initialEmployeeData}
                    onChange={handleFormChange}
                />
            </CustomModal>
            <ToastContainer />
        </div>
    );
}

export default AddCustomer;
