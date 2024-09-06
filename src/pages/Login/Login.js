import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '~/utils/AuthUtil/Auth';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        auth.login(username, password);
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
                        setUsername(e.target.value);
                    }}
                />
            </label>
            <label>
                Password:{' '}
                <input
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
