import axios from "axios";
import { baseURL } from "../constants/urls";
import { authService } from "./authService";
import { navigate } from "../untils/navigation";

const apiService = axios.create({ baseURL });

const forceLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('is_superuser');
    localStorage.removeItem('is_staff');
    localStorage.removeItem('is_user');
    localStorage.removeItem('userId');
    localStorage.removeItem('roleId');
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.dispatchEvent(new Event("authChanged"));
    navigate('/login');
};

apiService.interceptors.request.use(req => {
    const token = localStorage.getItem('access');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

apiService.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        const url = (originalRequest?.url || '').toLowerCase();
        const isAuthLogin = url.includes('api/auth/login') || url.endsWith('api/auth');


        if (isAuthLogin) {
            return Promise.reject(error);
        }


        if (error.response?.status === 401) {
            const refresh = localStorage.getItem('refresh');


            if (!refresh) {
                forceLogout();
                return Promise.reject(error);
            }


            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const newAccess = await authService.refreshToken();
                    originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                    return apiService(originalRequest);
                } catch (refreshError) {
                    forceLogout();
                    return Promise.reject(refreshError);
                }
            }


            forceLogout();
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export { apiService };

