export default {
    state:{
        loadingStatus: false,
        snackbar: {
            flag: false,
            statusCode: null,
            message: null
        },
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
}