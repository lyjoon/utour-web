import Api from "@/api/Api";
import store from "@/store";

class NoticeApi extends Api {
    async save(notice, attachments) {
        const formData = new FormData();
        formData.append('notice', new Blob([JSON.stringify(notice)], {type: 'application/json'}))
        // formData.append('attachments', attachments)
        attachments.forEach(v => {
            formData.append('attachments', v);
        });

        return await this.getAxios().post(`/api/v1/notice/save`, formData, {headers :{
                "Authorization" :`Bearer ${store.state.auth.token}`,
                "Content-Type": `multipart/form-data`,
            }});
    }

    async getList(page, limit, queryType, query){
        let parameters = {
            page: page,
            limit: limit,
            queryType: queryType,
            query: query,
        };

        return await this.getAxios().get(`/api/v1/notice/list?${this.queryString(parameters)}`);
    }

    async delete(noticeId) {
        return await this.getAxios().delete(`/api/v1/notice/${noticeId}`);
    }

    async get(noticeId) {
        return await this.getAxios().get(`/api/v1/notice/${noticeId}`);
    }

    async download(noticeId, attachId, originName) {
        await this.getAxios().get(`/api/v1/notice/${noticeId}/attach/${attachId}`, {responseType: 'arraybuffer'})
            .then(res => {
                this.fileDownloadResponse(res, originName)
            }).catch(error => {
                // console.log('download-error', error.response);
                store.commit("snackMessage", {message: `[${error.response.status}] 리소스를 찾을 수 없습니다.`})
            });
    }
}

export default new NoticeApi()