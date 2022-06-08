import Api from "@/api/Api";

class ProductApi extends Api {

    async save(payload, repImageFile, productImageFiles) {
        let formData = this.makeFormData(payload, repImageFile, productImageFiles);
        return await this.getAxios().post(`/api/v1/product/save`, formData, this.getMultipartHeader());
    }

    async update(payload, repImageFile, productImageFiles) {
        let formData = this.makeFormData(payload, repImageFile, productImageFiles);
        return await this.getAxios().post(`/api/v1/product/update`, formData, this.getMultipartHeader());
    }

    async pageList(parameters){
        return await this.getAxios().post(`/api/v1/product/page/list`, parameters);
    }

    async getList(arrivalCode, areaCode) {
        return await this.getAxios().get(`/api/v1/product/list?${this.queryString({arrivalCode: arrivalCode,areaCode: areaCode})}`);
    }

    async delete(productId){
        return await this.getAxios().delete(`/api/v1/product/${productId}`);
    }

    async get(productId){
        return await this.getAxios().get(`/api/v1/product/${productId}`);
    }

    makeFormData(payload, repImageFile, productImageFiles) {
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
        return formData;
    }
}

export default new ProductApi()