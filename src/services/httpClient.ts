import { axiosConfig } from '../constants/config';
import axios from 'axios';
import { getToken } from '../utils/tokenManagement';
import { loginUrl } from '../constants/endpoints';

const http = axios.create(axiosConfig);

const configRequestSuccess = (config: any) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        
    }
    return config;
};

const configRequestError = (error: any) => {
    return Promise.reject(error);
};

http.interceptors.request.use(configRequestSuccess, configRequestError);

const handleError = (error: any) => {
    const token = getToken();
    if (token) return Promise.reject(error);

    window.location.href = loginUrl;
};

const enforceSecurity = (request: Promise<any>, strict: boolean) => {
    return strict ? request.catch(handleError) : request;
};

const get = (path: string, strict: boolean = true) =>
    enforceSecurity(http.get(path), strict);
const del = (path: string, strict: boolean = true) =>
    enforceSecurity(http.delete(path), strict);
const post = (path: string, payload: any, strict: boolean = true) =>
    enforceSecurity(http.post(path, payload), strict);
const put = (path: string, payload: any, strict: boolean = true) =>
    enforceSecurity(http.put(path, payload), strict);

const httpClient = {
    get,
    post,
    put,
    delete: del,
};

export default httpClient;