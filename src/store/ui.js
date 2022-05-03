export default {
    state:{
        loadingStatus: false,
        snackbar: {
            flag: false,
            statusCode: null,
            message: null,
            intervalObject:null
        },
    },
    mutations:{
        startLoading(state) {
            state.loadingStatus = true;
        },
        endLoading(state) {
            state.loadingStatus = false;
        },
        snackMessage(state, {message}) {
            state.snackbar.flag = true;
            state.snackbar.message = message;
            if(state.snackbar.intervalObject) clearInterval(state.snackbar.intervalObject);
            state.snackbar.intervalObject = setInterval(() => {
                state.snackbar.flag = false;
                state.snackbar.message = null;
            }, 5000);
        }
    },
    getters:{
        getLoadingStatus: function (state) {
            return state.loadingStatus;
        }
    },
    actions:{}
}