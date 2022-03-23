import Vue from 'vue'
import Router from 'vue-router'

import adminRoutes from "./AdminRoute";
import appRoutes from "./AppRoute";
import NotFound from "../views/NotFound";

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
