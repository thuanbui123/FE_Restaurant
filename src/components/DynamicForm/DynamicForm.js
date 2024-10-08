import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DynamicForm.module.scss';
import CustomToastMessage from '~/components/CustomToastMessage';
import { request } from '~/utils/request';

const cx = classNames.bind(styles);

function DynamicForm({ fieldsConfig, initialData, onChange, primaryKey }) {
    const [formData, setFormData] = useState(initialData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const updatedData = {
            ...formData,
            [name]: value,
        };
        setFormData(updatedData);
        onChange(updatedData); // Gửi dữ liệu đến component cha
    };

    // Handle file change separately
    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            CustomToastMessage.error('Vui lòng chọn một ảnh trước!');
            return;
        }

        const form = new FormData();
        form.append('file', file);

        try {
            // Call API để upload ảnh
            const response = await request('post', '/uploads', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const imageUrl = response.data;

            setFormData((prevData) => ({
                ...prevData,
                img: imageUrl,
            }));

            onChange(formData);

            CustomToastMessage.info('Cập nhật ảnh thành công');
        } catch (error) {
            CustomToastMessage.error('Đã có lỗi khi cập nhật ảnh:', error);
        }
    };

    return (
        <form className={cx('form')}>
            {fieldsConfig.map((field) => (
                <div className={cx('form-group')} key={field.name}>
                    <label>{field.label}</label>
                    {field.type === 'select' ? (
                        <select name={field.name} value={formData[field.name] || ''} onChange={handleInputChange}>
                            <option value="">{field.placeholder}</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    ) : field.type === 'file' ? (
                        <input type="file" name={field.name} onChange={handleFileChange} />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                            readOnly={field.name === primaryKey}
                        />
                    )}
                </div>
            ))}
        </form>
    );
}

export default DynamicForm;
