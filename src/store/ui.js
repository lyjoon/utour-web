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
        },
        confirm: {
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
                state.alert['callback']();
            }
        },
        confirm(state, {title, message, callback}) {
            if(message) {
                state.confirm.title = title;
                state.confirm.message = message;
            } else {
                state.confirm.message = title;
                state.confirm.title = null;
            }
            state.confirm.flag = true;
            state.confirm.callback = callback;
        },
        confirmOk(state) {
            state.confirm.flag = false;
            if(state.confirm.callback && typeof(state.confirm.callback) == "function") {
                state.confirm['callback']();
            }
        },
        confirmCancel(state) {
            state.confirm.flag = false;
        },
    },
    getters:{
        getLoadingStatus: function (state) {
            return state.loadingStatus;
        }
    },
    actions:{}
}