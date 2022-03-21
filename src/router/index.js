import Vue from 'vue'
import Router from 'vue-router'

import adminRoutes from "./adminRoutes";
import appRoutes from "./appRoutes";
import NotFound from "../pages/NotFound";

Vue.use(Router)

export default new Router({
  mode: 'history', //removes # (hashtag) from url
  routes: [
    {
      path: '*',
      component: NotFound
    },
    ...adminRoutes,
    ...appRoutes
  ]
})
