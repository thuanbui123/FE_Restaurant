import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faEdit, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import CustomModal from '~/components/CustomModal';
import CustomToastMessage from '~/components/CustomToastMessage';
import DynamicForm from '../DynamicForm';
import { request } from '~/utils/request';
import { ToastContainer } from 'react-toastify';

library.add(faEdit, faTrashAlt, faSave, faTimes, faCheck);

function ProductItem({ food }) {
    const [formData, setFormData] = useState({});
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const editButtonStyle = {
        padding: '8px 20px',
        fontSize: '16px',
        borderRadius: '6px',
        marginTop: '10px',
    };
    const handleSave = async (updateData) => {
        try {
            await request('PUT', `http://localhost:8080/api-restaurant/foods/update/${updateData}`, formData);
            CustomToastMessage.success('Sửa món ăn thành công', () => {
                window.location.reload(); // Reload trang sau khi toast đóng
            });
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    const fieldsConfig = [
        {
            name: 'code',
            label: 'Mã món ăn',
            placeholder: 'Nhập mã món ăn',
            type: 'text',
            required: true,
            value: food.code,
        },
        {
            name: 'name',
            label: 'Tên món ăn',
            placeholder: 'Nhập tên món ăn',
            type: 'text',
            required: true,
            value: food.name,
        },
        { name: 'img', label: 'Ảnh', type: 'file', required: true, value: food.img },
        { name: 'price', label: 'Giá', placeholder: 'Nhập giá', type: 'number', required: true, value: food.price },
        {
            name: 'description',
            label: 'Mô tả món ăn',
            placeholder: 'Nhập mô tả món ăn',
            type: 'text',
            value: food.description,
        },
    ];

    const initialFoodData = {
        code: food.code || '',
        name: food.name || '',
        img: food.img || '',
        price: food.price || '',
        description: food.description || '',
    };

    const handleFormChange = (data) => {
        setFormData(data);
    };

    return (
        <>
            <Card style={{ width: '25rem', minHeight: '330px', margin: '20px' }}>
                <Card.Img
                    variant="top"
                    style={{ maxHeight: '160px', objectFit: 'cover' }}
                    src={food.img}
                    alt={food.name}
                />
                <Card.Body>
                    <Card.Title
                        style={{
                            fontSize: '1.6rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {food.name}
                    </Card.Title>
                    <Card.Text
                        style={{
                            fontSize: '1.4rem',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {food.description}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.4rem' }}>Giá: {food.price} VND</Card.Text>

                    <Button
                        style={{ fontSize: '1.4rem', letterSpacing: 0 }}
                        onClick={() => {
                            setIsEditModalOpen(true);
                        }}
                        className="btn btn-primary"
                    >
                        Sửa
                    </Button>
                </Card.Body>
            </Card>
            <CustomModal
                isOpen={isEditModalOpen}
                onRequestClose={() => setIsEditModalOpen(false)}
                contentLabel="Sửa thông tin"
                footer={
                    <>
                        <Button
                            style={{
                                ...editButtonStyle,
                                backgroundColor: '#007bff',
                                color: '#fff',
                                marginRight: '20px',
                            }}
                            variant="primary"
                            size="sm"
                            onClick={() => handleSave(food.code)}
                        >
                            <FontAwesomeIcon icon="save" />
                        </Button>
                        <Button
                            style={{ ...editButtonStyle, backgroundColor: '#6c757d', color: '#fff' }}
                            variant="secondary"
                            size="sm"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            <FontAwesomeIcon icon="times" />
                        </Button>
                    </>
                }
            >
                <DynamicForm
                    fieldsConfig={fieldsConfig}
                    initialData={initialFoodData}
                    primaryKey={'code'}
                    onChange={handleFormChange}
                />
            </CustomModal>

            <ToastContainer />
        </>
    );
}

export default ProductItem;
