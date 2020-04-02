import Vue from 'vue';
import VueRouter from 'vue-router';
import Query from "@/views/Query.vue";
import QueryResults from "@/views/QueryResults.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Query',
    component: Query,
  },
  {
    path: '/query-results',
    name: 'Query Results',
    component: QueryResults,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
