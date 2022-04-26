import Api from "./Api";

class LoginApi extends Api {
    async login(loginId, password) {
        let formData = new FormData();
        formData.set('loginId', loginId);
        formData.set('password', password);
        return await this.getAxios().post(`/api/v1/login`, formData);
    }

    async expired(token) {
        let header = {'Authorization': `Bearer ${token}`};
        return await this.getAxios().get(`/api/v1/login`, {headers: header});
    }
}
export default new LoginApi()