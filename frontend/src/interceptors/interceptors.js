import axios from "axios";

axios.interceptors.request.use((config) => {
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    config.headers.timezone = timeZone;
    return config;
}, (error) => {
    return Promise.reject(error);
});