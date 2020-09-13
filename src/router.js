import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import Overview from './pages/overview.vue';
import PkgDetail from './pages/pkgdetail.vue';
import PkgLog from './pages/pkglog.vue';

const routes = [
  {
    path: '/',
    component: Overview
  },
  {
    path: '/:name',
    component: PkgDetail
  },
  {
    path: '/:name/logs/:timestamp',
    component: PkgLog
  },
]

export default new Router({
  mode: 'history',
  routes
});
