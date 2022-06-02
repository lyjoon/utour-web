import Api from "@/api/Api";
import store from "@/store";

class ProductApi extends Api {

    async save(payload, repImageFile, productImageFiles) {
        let formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(payload)], {type: 'application/json'}));
        if(repImageFile) {
            formData.append("repImageFile", repImageFile);
        }
        if(productImageFiles && Array.isArray(productImageFiles) && productImageFiles.length > 0) {
            productImageFiles.forEach(item => {
                formData.append("productImageFiles", item);
            })
        }

        return await this.getAxios().post(`/api/v1/product/save`, formData, {headers :{
                "Authorization" :`Bearer ${store.state.auth.token}`,
                "Content-Type": `multipart/form-data`,
            }});
    }

    async update(payload, repImageFile, productImageFiles) {
        let formData = new FormData();
        formData.append('product', new Blob([JSON.stringify(payload)], {type: 'application/json'}));
        if(repImageFile) {
            formData.append("repImageFile", repImageFile);
        }
        if(productImageFiles && Array.isArray(productImageFiles) && productImageFiles.length > 0) {
            productImageFiles.forEach(item => {
                formData.append("productImageFiles", item);
            })
        }

        return await this.getAxios().post(`/api/v1/product/update`, formData, {headers :{
                "Authorization" :`Bearer ${store.state.auth.token}`,
                "Content-Type": `multipart/form-data`,
            }});
    }

    async getList(page, limit, queryType, query){
        let parameters = {
            page: page,
            limit: limit,
            queryType: queryType,
            query: query,
        };

        return await this.getAxios().get(`/api/v1/product/list?${this.queryString(parameters)}`);
    }

    async findAll(nationCode, areaCode) {
        let parameters = {
            nationCode: nationCode,
            areaCode: areaCode
        };
        return await this.getAxios().get(`/api/v1/product/find-all?${this.queryString(parameters)}`);
    }

    async delete(productId){
        return await this.getAxios().delete(`/api/v1/product/${productId}`);
    }


    async get(productId){
        return await this.getAxios().get(`/api/v1/product/${productId}`);
    }
}

export default new ProductApi()