import Api from "@/api/Api";

class CodeApi extends Api {

    async getNationAllList(){
        return await this.getAxios().get(`/api/v1/code/nation/all`);
    }

    async getNation(nationCode) {
        return await this.getAxios().get(`/api/v1/code/nation?nationCode=${nationCode || ''}`);
    }

    async getAreaList(parameters) {
        return await this.getAxios().post('/api/v1/code/area-list', parameters)
    }

    async getArrivalList() {
        return this.getAxios().post('/api/v1/code/arrival-list' ,{});
    }

    async getCommonCode(groupCode) {
        return await this.getAxios().get(`/api/v1/code/common?groupCode=${groupCode || ''}`);
    }
}

export default new CodeApi()