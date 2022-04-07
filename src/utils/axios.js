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
        store.state.snackbar.message = "잘못된 요청입니다.";
        store.state.snackbar.flag = true;

        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        store.commit('endLoading');
        return response;
    },
    error => {
        store.state.snackbar.message = `[${error.response.status}] ${error.response.data.message || '잘못된 응답결과입니다. 관리자에게 문의바랍니다.' }`;
        store.state.snackbar.flag = true;

        return Promise.reject(error);
    }
)

export default axiosInstance