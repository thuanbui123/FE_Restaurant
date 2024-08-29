import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth';

function Login() {
    const [user, setUser] = useState('');
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

    const handleLogin = () => {
        auth.login(user);
        // Điều hướng người dùng tới trang trước đó
        navigate(redirectPath);
    };

    return (
        <div>
            <label>
                Username:{' '}
                <input
                    type="text"
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
