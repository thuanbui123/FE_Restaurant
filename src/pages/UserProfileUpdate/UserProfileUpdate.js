import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './UserProfileUpdate.module.scss';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import { ToastContainer } from 'react-toastify';
import DynamicForm from '~/components/DynamicForm';

const cx = classNames.bind(styles);

function UserProfileUpdate() {
    const [formData, setFormData] = useState({});
    const [avatarUrl, setAvatarUrl] = useState('');

    useEffect(() => {
        document.title = 'Cập nhật thông tin khách hàng';
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            CustomToastMessage.error('Vui lòng chọn một ảnh trước!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Call API để upload ảnh
            const response = await request('post', '/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Nhận URL ảnh trả về từ server
            const imageUrl = response.data;

            // Lưu URL vào state
            setAvatarUrl(imageUrl);
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const id = user.id;
            // Call API để cập nhật avatar cho người dùng
            await request('put', `/account/update/${id}`, {
                img: imageUrl,
            });

            CustomToastMessage.info('Cập nhật ảnh thành công');
        } catch (error) {
            CustomToastMessage.error('Đã có lỗi khi cập nhật ảnh:', error);
        }
    };

    const callApiImg = async () => {
        try {
            const userString = localStorage.getItem('user');
            const user = JSON.parse(userString);
            const id = user.id;
            const response = await request('get', `account/find-account-by-id?query=${id}`);
            const data = await response.data;
            if (data !== null) {
                setAvatarUrl(data.img);
            }
        } catch (error) {
            CustomToastMessage.error(error.response?.data);
        }
    };

    useEffect(() => {
        callApiImg();
    }, []);

    const generateCustomerCodeFromTime = () => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Kết hợp giờ, phút, giây để tạo thành 3 số cuối
        const randomNum = `${hours}${minutes}${seconds}`.slice(-3); // Lấy 3 số cuối của chuỗi thời gian

        return `CUST${randomNum}`;
    };
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const id = user.id;
    const initialEmployeeData = {
        code: generateCustomerCodeFromTime(),
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        accountId: id || '', // Lấy accountId từ localStorage
    };

    const handleFormChange = (data) => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const id = user.id;
        setFormData({
            ...data,
            code: generateCustomerCodeFromTime(),
            accountId: id, // Sinh mã khách hàng mới khi form thay đổi
        });
    };

    const fieldsConfig = [
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
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi request POST tới API
            console.log(formData);
            const response = await request('post', 'customers/add', formData);

            // Kiểm tra phản hồi từ server
            if (response.status === 201) {
                CustomToastMessage.info('Cập nhật thông tin thành công.');
            } else {
                CustomToastMessage.error('Đã có lỗi khi cập nhật thông tin!');
            }
        } catch (error) {
            CustomToastMessage.error('Đã xảy ra lỗi:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p className={cx('title')}>THÔNG TIN KHÁCH HÀNG</p>
            </div>
            <div className={cx('container')}>
                <div className={cx('avatar')}>
                    <img src={avatarUrl} alt="avatar" />
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className={cx('profile')}>
                    <DynamicForm
                        fieldsConfig={fieldsConfig}
                        initialData={initialEmployeeData}
                        onChange={handleFormChange}
                    />
                    <button onClick={handleSubmit} className={cx('button')}>
                        Lưu thông tin
                    </button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserProfileUpdate;
