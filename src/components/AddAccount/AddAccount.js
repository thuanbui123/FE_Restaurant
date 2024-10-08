import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import CustomModal from '../CustomModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import DynamicForm from '../DynamicForm';
import { ToastContainer } from 'react-toastify';
import style from './AddAccount.moudle.scss';
import CustomToastMessage from '~/components/CustomToastMessage';
import { useState } from 'react';
import { request } from '~/utils/request';

library.add(faPlus);

const cx = classNames.bind(style);

function AddAccount() {
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
        username: '',
        password: '',
    };

    const fieldsConfig = [
        { name: 'username', label: 'Tên đăng nhập', placeholder: 'Nhập tên đăng nhập', type: 'text', required: true },
        {
            name: 'password',
            label: 'Mật khẩu',
            placeholder: 'Nhập mật khẩu',
            type: 'password',
            required: true,
        },
    ];

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/account/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Thêm tài khoản nhân viên thành công', () => {
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
                contentLabel="Thêm tài khoản nhân viên"
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

export default AddAccount;
