import Vue from "vue";
import Vuex from "vuex"
import createPersistedState from "vuex-persistedstate"
import auth from "@/store/auth";
import ui from "@/store/ui";

Vue.use(Vuex);

const store = new Vuex.Store({
    plugins:[createPersistedState({paths:['auth']})],
    modules: {
        ui:ui,
        auth:auth
    },
})

export default store;