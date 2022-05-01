import Api from "@/api/Api";

class InquiryApi extends Api {
    async save(payload) {
        return await this.getAxios().put(`/api/v1/inquiry`, payload);
    }
}

export default new InquiryApi()