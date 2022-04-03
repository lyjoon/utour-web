import axios from 'axios'
import store from '../store'

const axiosInstance = axios.create({
})

axiosInstance.interceptors.request.use(
    config => {
        store.commit('startLoading');
        return config;
    },
    error => {
        console.error('data response failure.');
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        store.commit('endLoading');
        return response;
    },
    error => {
        console.error('data response failure.');
        return Promise.reject(error);
    }
)

export default axiosInstance