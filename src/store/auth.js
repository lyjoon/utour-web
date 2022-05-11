export default {
    state: {
        token: null
    },
    mutations: {
        setToken(state, {token}) {
            state.token = token;
        },
        logout(state){
            state.token = null;
        }
    },
    getters: {
        isAuthor: function(state){
            return !!state.token;
        }
    },
    actions: {}
}