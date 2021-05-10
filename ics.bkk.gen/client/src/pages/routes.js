import Vue from 'vue';
import Router from 'vue-router';
import PGen from './Gen.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: PGen },    
  ],
  linkExactActiveClass: "active"
});