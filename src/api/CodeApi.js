import Api from "@/api/Api";

class CodeApi extends Api {

    async getNationAllList(){
        return await this.getAxios().get(`/api/v1/code/nation/all`);
    }

    async getNationList(query){
        return await this.getAxios().get(`/api/v1/code/nation/list?query=${query}`);
    }

    async getNation(nationCode) {
        return await this.getAxios().get(`/api/v1/code/nation?nationCode=${nationCode || ''}`);
    }

    async getCommonCode(groupCode) {
        return await this.getAxios().get(`/api/v1/code/common?groupCode=${groupCode || ''}`);
    }
}

export default new CodeApi()