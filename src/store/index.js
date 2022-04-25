import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loadingStatus: false,
        snackbar: {
            flag: false,
            statusCode: null,
            message: null
        },
        token: null
    },
    mutations:{
        startLoading(state) {
            state.loadingStatus = true;
        },
        endLoading(state) {
            state.loadingStatus = false;
        }
    },
    getters:{
        getLoadingStatus: function (state) {
            return state.loadingStatus;
        }
    },
    actions:{}
})