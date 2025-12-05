import axios from "axios";
import {baseURL} from "../constants/urls";
import {authService} from "./authService";

const apiService = axios.create({baseURL})


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
        const isAuthRefresh = url.includes('api/auth/refresh');

        if (isAuthLogin || isAuthRefresh) {
            return Promise.reject(error);
        }


        if (error.response?.status === 401 && !originalRequest._retry) {
            const refresh = localStorage.getItem('refresh');
            if (!refresh) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            try {
                const newAccess = await authService.refreshToken();
                originalRequest.headers = {
                    ...(originalRequest.headers || {}),
                    Authorization: `Bearer ${newAccess}`,
                };
                return apiService(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export {apiService};