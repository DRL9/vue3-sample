import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import TestList from "@/views/TestList.vue";
import Test from "@/views/Test.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/svg_text",
    name: "SVGText",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "svg" */ "../views/TextSvg.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
    children: [
      {
        path: "list",
        component: TestList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
