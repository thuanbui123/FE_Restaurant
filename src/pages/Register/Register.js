import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '~/pages/LoginAndRegister/styles.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.path || '/update-info';

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        // Xóa các error trước đó
        setError('');
        const errorMessage = await auth.register(email, username, password);
        if (errorMessage) {
            setError(errorMessage);
        } else {
            navigate(redirectPath);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={cx('form-container', 'register-container')}>
            <form onSubmit={handleRegisterSubmit}>
                <h1>Register here</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
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
                <button type="submit">Register</button>
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

export default Register;
