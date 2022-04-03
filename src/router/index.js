import Vue from 'vue'
import Router from 'vue-router'

import admin from "./admin";
import app from "./app";
import NotFound from "../views/NotFound";
import store from "../store"

Vue.use(Router)

const router = new Router({
  mode: 'history', //removes # (hashtag) from url
  routes: [
    {
      path: '*',
      component: NotFound
    },
    ...admin,
    ...app
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('startLoading')
  setTimeout(() => {
    next();
  }, 500);
})

router.afterEach((to, from ) => {
  store.commit('endLoading');
})

export default router;