import { createContext, useContext, useState } from 'react';
import { request } from '~/utils/request';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const initialUser = () => {
        try {
            const user = localStorage.getItem('user');
            // Kiểm tra nếu user không phải là chuỗi JSON hợp lệ
            if (user && user !== 'undefined') {
                return user;
            }
            return null;
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    };
    const [user, setUser] = useState(initialUser);

    const login = async (username, password) => {
        const postData = {
            username: username,
            password: password,
        };
        try {
            const res = await request('post', '/auth/authenticate', postData);
            let data = res.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.username));
            setUser(data.username);
        } catch (error) {
            if (error.response) {
                const backendMessage = error.response.data.message || 'An error occurred. Please try again.';
                return backendMessage;
            } else {
                return 'Network error or server not reachable';
            }
        }
    };

    const register = async (email, username, password) => {
        const postData = {
            email: email,
            username: username,
            password: password,
        };
        try {
            const res = await request('post', '/auth/register', postData);
            let data = res.data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.username));
            setUser(data.username);
        } catch (error) {
            if (error.response) {
                const backendMessage = error.response.data.message || 'An error occurred. Please try again.';
                return backendMessage;
            } else {
                return 'Network error or server not reachable';
            }
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
