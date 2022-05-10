export default {
    state: {
        token: null
    },
    mutations: {
        setToken(state, {token}) {
            state.token = token;
        }
    },
    getters: {
        isAuthor: function(state){
            return !!state.token;
        }
    },
    actions: {}
}