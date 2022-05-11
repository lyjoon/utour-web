import Api from "@/api/Api";

class UserApi extends Api {

    async save(payload) {
        return await this.getAxios().put(`/api/v1/user`, payload);
    }

    async updateYn(userId, useYn) {
        let payload = {userId:userId, useYn:useYn};
        return await this.getAxios().put(`/api/v1/user/updateYn`, payload);
    }

    async getList(page, limit, query){
        let parameters = {
            page: page,
            limit: limit,
            query: query,
        };
        return await this.getAxios().get(`/api/v1/user/list?${this.queryString(parameters)}`);
    }

    async get(userId) {
        return await this.getAxios().get(`/api/v1/user?userId=${userId}`);
    }
    async delete(userId) {
        return await this.getAxios().delete(`/api/v1/user?userId=${userId}`);
    }
}

export default new UserApi()