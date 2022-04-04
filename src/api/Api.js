import axios from "../utils/axios";
export default class Api {
    resource;

    queryString(payload) {
        let entries = Object.entries(payload || {});
        return entries && entries.length > 0 ? entries.map(e => e.join('=')).join('&') : '';
    }

    getAxios() {
       return axios;
    }
}