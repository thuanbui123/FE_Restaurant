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

function ComboItem({ combo }) {
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
            await request('PUT', `http://localhost:8080/api-restaurant/combos/update/${updateData}`, formData);
            CustomToastMessage.success('Sửa món ăn thành công', () => {
                window.location.reload(); // Reload trang sau khi toast đóng
            });
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại!';
            CustomToastMessage.error(errorMessage);
        }
    };

    const fieldsConfig = [
        {
            name: 'code',
            label: 'Mã combo món ăn',
            placeholder: 'Nhập combo mã món ăn',
            type: 'text',
            required: true,
            value: combo.code,
        },
        {
            name: 'name',
            label: 'Tên combo món ăn',
            placeholder: 'Nhập combo tên món ăn',
            type: 'text',
            required: true,
            value: combo.name,
        },
        { name: 'img', label: 'Ảnh', type: 'file', required: true, value: combo.img },
        {
            name: 'description',
            label: 'Mô tả món ăn',
            placeholder: 'Nhập mô tả món ăn',
            type: 'text',
            value: combo.description,
        },
        {
            name: 'soldCount',
            label: 'Số lượng bán',
            placeholder: 'Nhập số lượng combo món ăn được bán',
            type: 'text',
            value: combo.soldCount,
        },
        {
            name: 'validFrom',
            label: 'Ngày mở bán',
            placeholder: 'Nhập ngày mở bán combo món ăn được bán',
            type: 'date',
            value: combo.validFrom,
        },
        {
            name: 'validTo',
            label: 'Ngày kết thúc',
            placeholder: 'Nhập ngày kết thúc bán combo món ăn',
            type: 'date',
            value: combo.validTo,
        },
    ];

    const convertDateFormat = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`; // Trả về định dạng YYYY-MM-DD
    };

    const initialFoodData = {
        code: combo.code || '',
        name: combo.name || '',
        img: combo.img || '',
        description: combo.description || '',
        soldCount: combo.soldCount || '',
        validFrom: convertDateFormat(combo.validFrom) || '',
        validTo: convertDateFormat(combo.validTo) || '',
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
                    src={combo.img}
                    alt={combo.name}
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
                        {combo.name}
                    </Card.Title>
                    <Card.Text style={{ fontSize: '1.4rem' }}>Giá: {combo.price} VND</Card.Text>
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
                        {combo.description}
                    </Card.Text>
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
                        Số lượng bán: {combo.soldCount}
                    </Card.Text>
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
                        Ngày mở bán: {combo.validFrom}
                    </Card.Text>
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
                        Ngày kết thúc: {combo.validTo}
                    </Card.Text>

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
                            onClick={() => handleSave(combo.code)}
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

export default ComboItem;
