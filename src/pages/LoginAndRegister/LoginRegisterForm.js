import classNames from 'classnames/bind';
import styles from '~/pages/LoginAndRegister/styles.module.scss';
import Register from '~/pages/Register';
import Login from '~/pages/Login';
import Overlay from './Overlay';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function LoginRegisterForm() {
    // Quản lý trạng thái panel (login hoặc register)
    const [isRegisterActive, setRegisterActive] = useState(false);

    useEffect(() => {
        document.body.classList.add(cx('login-register-active'));
        return () => {
            document.body.classList.remove(cx('login-register-active'));
        };
    }, []);

    // Chuyển sang form đăng ký
    const handleRegisterClick = () => {
        setRegisterActive(true);
    };

    // Chuyển sang form đăng nhập
    const handleLoginClick = () => {
        setRegisterActive(false);
    };
    return (
        <div className={cx('container', { 'right-panel-active': isRegisterActive })} id="container">
            <Register />
            <Login />
            <Overlay onRegisterClick={handleRegisterClick} onLoginClick={handleLoginClick} />
        </div>
    );
}

export default LoginRegisterForm;
