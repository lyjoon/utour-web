import Vue from 'vue'
import Router from 'vue-router'

import admin from "./admin";
import app from "./app";
import NotFound from "../views/NotFound";
import Test from "../views/Test";
import store from "../store"
import LoginApi from "@/api/LoginApi";

Vue.use(Router)

const router = new Router({
  mode: 'history', //removes # (hashtag) from url
  routes: [
    {
      path: '*',
      component: NotFound
    },{
      path:'/test',
      component: Test
    },
    ...admin,
    ...app
  ]
})
router.beforeEach((to, from, next) => {
  store.commit('startLoading')

  // 계정체크
  let authorization = to.meta['authorization'];
  if(authorization) {
    let token = store.state.auth.token;
    let res = LoginApi.expired(token);
    res.then( res => {
      let flag = res.data.result;
      if(flag) {
        next();
      } else {
        router.push({path : '/admin/login'});
      }
    })
  } else {
    setTimeout(() => {
      next();
    }, 500);
  }
})

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from ) => {
  store.commit('endLoading');
})

export default router;