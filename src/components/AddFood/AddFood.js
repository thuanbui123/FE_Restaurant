import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './AddFood.module.scss';
import { Button } from 'react-bootstrap';
import CustomModal from '~/components/CustomModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomToastMessage from '~/components/CustomToastMessage';
import DynamicForm from '../DynamicForm';
import { ToastContainer } from 'react-toastify';
import { request } from '~/utils/request';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

library.add(faPlus);

const cx = classNames.bind(style);

function AddFood() {
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

    const generateFoodCode = () => {
        const now = new Date();

        // Lấy ngày hiện tại
        const day = now.getDate().toString().padStart(2, '0');

        // Tạo 3 số ngẫu nhiên
        const randomNumber = Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, '0');

        // Kết hợp tiền tố "FOOD", ngày và số ngẫu nhiên
        return `FOOD${day}${randomNumber}`;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const initialFoodData = {
        code: generateFoodCode(),
        name: '',
        img: '',
        price: '',
        description: '',
    };

    const fieldsConfig = [
        { name: 'name', label: 'Tên món ăn', placeholder: 'Nhập tên món ăn', type: 'text', required: true },
        { name: 'img', label: 'Ảnh', type: 'file', required: true },
        { name: 'price', label: 'Giá', placeholder: 'Nhập giá', type: 'number', required: true },
        {
            name: 'description',
            label: 'Mô tả món ăn',
            placeholder: 'Nhập mô tả món ăn',
            type: 'text',
        },
    ];

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/foods/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Thêm món ăn thành công', () => {
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
                contentLabel="Thêm món ăn"
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
                <DynamicForm fieldsConfig={fieldsConfig} initialData={initialFoodData} onChange={handleFormChange} />
            </CustomModal>
            <ToastContainer />
        </div>
    );
}

export default AddFood;
