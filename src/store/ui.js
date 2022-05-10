export default {
    state:{
        loadingStatus: false,
        snackbar: {
            flag: false,
            statusCode: null,
            message: null,
            intervalObject:null
        },
        alert: {
            flag: false,
            title: null,
            message: null,
            callback: null
        }
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
        },
        alert(state, {title, message, callback}) {
            if(message) {
                state.alert.title = title;
                state.alert.message = message;
            } else {
                state.alert.message = title;
                state.alert.title = null;
            }
            state.alert.flag = true;
            state.alert.callback = callback;
        },
        alertClose(state) {
            state.alert.flag = false;
            if(state.alert.callback && typeof(state.alert.callback) == "function") {
                // callback();
                console.log('alertClose', state.alert['callback']);
                state.alert['callback']();
            }
        }
    },
    getters:{
        getLoadingStatus: function (state) {
            return state.loadingStatus;
        }
    },
    actions:{}
}