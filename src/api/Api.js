import axios from "../utils/axios";
import fileDownload from "js-file-download";
import store from "@/store";
export default class Api {
    resource;

    queryString(payload) {
        let entries = Object.entries(payload || {});
        return entries && entries.length > 0 ? entries.map(e => e.join('=')).join('&') : '';
    }

    getAxios() {
       return axios;
    }

    getFileDownload() {
        return fileDownload;
    }

    fileDownloadResponse(response, originName) {
        let contentDisposition = response.headers['content-disposition'];
        let fileName = decodeURI(contentDisposition.split('filename=')[1].split(';')[0].replace(/['"]/g, ''));
        this.getFileDownload()(response.data, originName || fileName);
    }

    getMultipartHeader() {
        return {headers :{
                "Authorization" :`Bearer ${store.state.auth.token}`,
                "Content-Type": `multipart/form-data`,
            }};
    }
}