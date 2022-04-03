import Api from "./api";

class QnaApi extends Api {

    async save(command) {
        return await this.getAxios().put(`/api/qna`, command);
    }

    async getList(page, limit, query_type, query) {
        let parameters = {
            page: page,
            limit: limit,
            query_type: query_type,
            query: query,
        };

        return await this.getAxios().get(`/api/qna/list?${this.queryString(parameters)}`);
    }

    async get(qna_id) {
        return await this.getAxios().get(`/api/qna/${qna_id}`);
    }

    async delete(qna_id) {
        return await this.getAxios().delete(`/api/qna/${qna_id}`);
    }

    async getReplies(page, qna_id) {
        let parameters = {page: page};
        return await this.getAxios().get(`/api/qna/${qna_id}/replies?${this.queryString(parameters)}`);
    }

    async saveReply(command) {
        return await this.getAxios().put(`/api/qna/reply`, command);
    }

    async deleteReply(qna_id, qna_reply_id) {
        return await this.getAxios().delete(`/api/qna/${qna_id}/reply/${qna_reply_id}`);
    }
}
export default new QnaApi()