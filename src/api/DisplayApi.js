import Api from "./Api";
import store from "@/store";

class DisplayApi extends Api {


    async getCarousels() {
        let parameters = {};
        return await this.getAxios().get(`/api/v1/display/carousel/list?${this.queryString(parameters)}`);
    }

    async getCommerces() {
        let parameters = {};
        return await this.getAxios().get(`/api/v1/display/commerce/list?${this.queryString(parameters)}`);
    }

    async saveCarousel(payload, file) {
        let formData = new FormData();
        formData.append('carousel', new Blob([JSON.stringify(payload)], {type: 'application/json'}));
        if(file) {
            formData.append("imageFile", file);
        }

        return await this.getAxios().post(`/api/v1/display/carousel/save`, formData, {headers :{
                "Authorization" :`Bearer ${store.state.auth.token}`,
                "Content-Type": `multipart/form-data`,
            }});
    }

    async deleteCarousel(carouselId) {
        return await this.getAxios().delete(`/api/v1/display/carousel/${carouselId}`);
    }

    async deleteCommerce(commerceId) {
        return await this.getAxios().delete(`/api/v1/display/commerce/${commerceId}`);
    }

    async saveCommerce(payload) {
        return await this.getAxios().put(`/api/v1/display/commerce`, payload);
    }

}
export default new DisplayApi()