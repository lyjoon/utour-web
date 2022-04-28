import Api from "@/api/Api";

class NoticeApi extends Api {
    async save(formData) {
        return await this.getAxios().post(`/api/v1/notice/save`, formData);
    }
}

export default new NoticeApi()