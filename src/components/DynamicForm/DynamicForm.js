import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DynamicForm.module.scss';

const cx = classNames.bind(styles);

function DynamicForm({ fieldsConfig, initialData, onChange }) {
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
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={handleInputChange}
                        />
                    )}
                </div>
            ))}
        </form>
    );
}

export default DynamicForm;
