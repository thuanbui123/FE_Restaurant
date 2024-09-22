import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth';
import classNames from 'classnames/bind';
import styles from '~/pages/LoginAndRegister/styles.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const userData = auth.user || JSON.parse(localStorage.getItem('user'));
        if (userData) {
            if (userData.role === 'ROLE_USER') {
                navigate('/products');
            } else if (userData.role === 'ROLE_EMPLOYEE_ADMIN' || userData.role === 'ROLE_EMPLOYEE') {
                navigate('/admin-employee');
            } else {
                alert(`Unknown role: ${userData.role}`);
            }
        }
    }, [auth.user, navigate]);

    const handleLoginSubmit = async (e) => {
        await e.preventDefault();
        setError('');
        const errorMessage = await auth.login(username, password);

        if (errorMessage) {
            setError(errorMessage);
        } else {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                if (userData.role === 'ROLE_USER') {
                    navigate('/products');
                } else if (userData.role === 'ROLE_EMPLOYEE_ADMIN' || userData.role === 'ROLE_EMPLOYEE') {
                    navigate('/admin-employee');
                } else {
                    alert(`Unknown role: ${userData.role}`);
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cx('form-container', 'login-container')}>
            <form onSubmit={handleLoginSubmit}>
                <h1>Login here</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <div className={cx('content')}>
                    <div className={cx('checkbox')}>
                        <input
                            type="checkbox"
                            name="checkbox"
                            id="checkbox"
                            checked={showPassword}
                            onChange={togglePasswordVisibility}
                        />
                        <label>{showPassword ? 'Hide' : 'Show'} password</label>
                    </div>
                    {/*
                    <div className={cx('pass-link')}>
                        Using Link from react-router-dom for navigation 
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    */}
                </div>
                <button type="submit">Login</button>
                <span>or use your account</span>
                <div className={cx('social-container')}>
                    <Link to="#" className={cx('social')}>
                        <i className={classNames('lni', 'lni-facebook-fill')}></i>
                    </Link>
                    <Link to="#" className={cx('social')}>
                        <i className={classNames('lni', 'lni-google')}></i>
                    </Link>
                    <Link to="#" className={cx('social')}>
                        <i className={classNames('lni', 'lni-linkedin-original')}></i>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
