import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AddEmployee.module.scss';
import { Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomModal from '~/components/CustomModal';
import { request } from '~/utils/request';
import DynamicForm from '~/components/DynamicForm';
import { ToastContainer } from 'react-toastify';
import CustomToastMessage from '~/components/CustomToastMessage';
import 'react-toastify/dist/ReactToastify.css';

library.add(faPlus);

const cx = classNames.bind(styles);

function AddEmployee() {
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
            const response = await request('get', `/account/get-accounts`);
            setAccounts(response.data);
        } catch (error) {
            CustomToastMessage.error(error.response.data.message);
        }
    };

    useEffect(() => {
        callAccountApi();
    }, []);

    const fieldsConfig = [
        { name: 'code', label: 'Mã nhân viên', placeholder: 'Nhập mã nhân viên', type: 'text', required: true },
        { name: 'name', label: 'Tên nhân viên', placeholder: 'Nhập tên nhân viên', type: 'text', required: true },
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

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/employees/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Thêm nhân viên thành công', () => {
                window.location.reload(); // Reload trang sau khi toast đóng
            });
        } catch (error) {
            console.log(error.response.data);
            CustomToastMessage.error(error.response.data);
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
                contentLabel="Thêm nhân viên"
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

export default AddEmployee;
