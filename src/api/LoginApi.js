import Api from "./Api";

class LoginApi extends Api {
    async login(loginId, password) {
        let formData = new FormData();
        formData.set('loginId', loginId);
        formData.set('password', password);
        return await this.getAxios().post(`/api/v1/login`, formData);
    }

    async get(qnaId, password) {
        return await this.getAxios().get(`/api/v1/qna/${qnaId}?password=${password}`);
    }
}
export default new LoginApi()