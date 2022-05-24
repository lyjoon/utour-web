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
}

export default new ProductApi()