import Api from "./Api";

class QnaApi extends Api {

    async save(command) {
        return await this.getAxios().put(`/api/v1/qna`, command);
    }

    async getList(page, limit, queryType, query) {
        let parameters = {
            page: page,
            limit: limit,
            queryType: queryType,
            query: query,
        };

        return await this.getAxios().get(`/api/v1/qna/list?${this.queryString(parameters)}`);
    }

    async get(qnaId, password) {
        return await this.getAxios().get(`/api/v1/qna/${qnaId}?password=${password}`);
    }

    async delete(qnaId, password) {
        return await this.getAxios().delete(`/api/v1/qna/${qnaId}?password=${password}`);
    }

    async getReplies(page, qnaId) {
        let parameters = {page: page};
        return await this.getAxios().get(`/api/v1/qna/${qnaId}/replies?${this.queryString(parameters)}`);
    }

    async saveReply(command) {
        return await this.getAxios().put(`/api/v1/qna/reply`, command);
    }

    async deleteReply(qnaId, qnaReplyId) {
        return await this.getAxios().delete(`/api/v1/qna/${qnaId}/reply/${qnaReplyId}`);
    }
}
export default new QnaApi()