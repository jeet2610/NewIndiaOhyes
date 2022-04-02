import axios from 'axios';
import { getUser } from './auth';

// Changes for same domain check 
export const URL = 'http://localhost:3000';

const instance = axios.create({
    baseURL: `${URL}/api`,
    timeout: 10000,
    withCredentials: true
});

instance.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${getUser()}`;
    return config;
});

export default instance;