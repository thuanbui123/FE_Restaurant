import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './AddCombo.module.scss';
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

function AddCombo() {
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
        return `COMB${day}${randomNumber}`;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const initialComboData = {
        code: generateFoodCode(),
        name: '',
        img: '',
        description: '',
        soldCount: '',
        validFrom: '',
        validTo: '',
    };

    const fieldsConfig = [
        {
            name: 'code',
            label: 'Mã combo món ăn',
            placeholder: 'Nhập combo mã món ăn',
            type: 'text',
            required: true,
        },
        {
            name: 'name',
            label: 'Tên combo món ăn',
            placeholder: 'Nhập combo tên món ăn',
            type: 'text',
            required: true,
        },
        { name: 'img', label: 'Ảnh', type: 'file', required: true },
        {
            name: 'description',
            label: 'Mô tả món ăn',
            placeholder: 'Nhập mô tả món ăn',
            type: 'text',
        },
        {
            name: 'soldCount',
            label: 'Số lượng bán',
            placeholder: 'Nhập số lượng combo món ăn được bán',
            type: 'text',
        },
        {
            name: 'validFrom',
            label: 'Ngày mở bán',
            placeholder: 'Nhập ngày mở bán combo món ăn được bán',
            type: 'date',
        },
        {
            name: 'validTo',
            label: 'Ngày kết thúc',
            placeholder: 'Nhập ngày kết thúc bán combo món ăn',
            type: 'date',
        },
    ];

    const handleFormChange = (data) => {
        setFormData(data);
    };

    const handleSave = async () => {
        try {
            await request('post', `/combos/add`, formData);
            setIsOpen(false);
            CustomToastMessage.success('Thêm combo món ăn thành công', () => {
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
                contentLabel="Thêm combo món ăn"
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
                    primaryKey={'code'}
                    initialData={initialComboData}
                    onChange={handleFormChange}
                />
            </CustomModal>
            <ToastContainer />
        </div>
    );
}

export default AddCombo;
