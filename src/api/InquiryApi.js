import Api from "@/api/Api";

class InquiryApi extends Api {
    async save(payload) {
        return await this.getAxios().put(`/api/v1/inquiry`, payload);
    }

    async getList(page, limit, queryType, query){
        let parameters = {
            page: page,
            limit: limit,
            queryType: queryType,
            query: query,
        };
        return await this.getAxios().get(`/api/v1/inquiry/list?${this.queryString(parameters)}`);
    }

    async setStatus(inquiryId, status) {
        let parameters = {inquiryId:inquiryId, status : status};
        return await this.getAxios().put(`/api/v1/inquiry/status`, parameters);
    }

    async get(inquiryId) {
        return await this.getAxios().get(`/api/v1/inquiry/${inquiryId}`);
    }
}

export default new InquiryApi()