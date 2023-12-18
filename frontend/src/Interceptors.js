import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000',
});

// Add a request interceptor
instance.interceptors.request.use((config) => {
    // Add timezone to the headers
    config.headers['User-Timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return config;
}, (error) => {
    return Promise.reject(error);
});

export { instance as APIPointer };