import axios from 'axios';
import CustomToastMessage from '~/components/CustomToastMessage';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

httpRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                CustomToastMessage.error('Lỗi 401: Unauthorized. Bạn cần đăng nhập lại.', () => {
                    localStorage.clear();
                    window.location.href = '/auth';
                });
            } else if (error.response.status === 403) {
                CustomToastMessage.error('Lỗi 403: Forbidden. Bạn không có quyền truy cập.', () => {});
                localStorage.clear();
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    },
);

export const request = async (method, path, data = null, options = {}) => {
    try {
        const token = localStorage.getItem('token');

        if (token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`,
            };
        }

        let response;

        switch (method.toLowerCase()) {
            case 'get':
                response = await httpRequest.get(path, options);
                break;
            case 'post':
                response = await httpRequest.post(path, data, options);
                break;
            case 'put':
                response = await httpRequest.put(path, data, options);
                break;
            case 'delete':
                response = await httpRequest.delete(path, options);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }

        return response;
    } catch (error) {
        throw error;
    }
};
export default httpRequest;
