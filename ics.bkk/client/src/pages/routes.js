import Vue from 'vue';
import Router from 'vue-router';
import Home from './Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Home },
  ],
  linkExactActiveClass: "active"
});