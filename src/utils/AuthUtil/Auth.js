import { createContext, useContext, useState } from 'react';
import { request } from '~/utils/request';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const initialUser = () => {
        try {
            const user = localStorage.getItem('user');
            return user ? JSON.parse(user) : null;
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
        const res = await request('post', '/auth/authenticate', postData);
        let data = res.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.username);
        setUser(data.username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};
