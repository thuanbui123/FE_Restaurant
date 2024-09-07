import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth';
import classNames from 'classnames/bind';
import styles from '~/pages/LoginAndRegister/styles.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const redirectPath = location.state?.path || '/';

    useEffect(() => {
        if (auth.user) {
            // Nếu người dùng đã đăng nhập, điều hướng tới trang home
            navigate('/');
        }
    }, [auth.user, navigate]);

    const handleLoginSubmit = async (e) => {
        await e.preventDefault();
        // Xóa các error trước đó
        setError('');
        const errorMessage = await auth.login(username, password);

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
