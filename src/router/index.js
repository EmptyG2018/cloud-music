import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/home")
      }
    ]
  },
  {
    path: "/",
    redirect: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "search",
        name: "search",
        component: () => import("@/views/search")
      }
    ]
  },
  {
    path: "/",
    redirect: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "songList/:id",
        name: "songList",
        component: () => import("@/views/songList")
      }
    ]
  },
  {
    path: "/mv/:id",
    name: "mv",
    component: () => import("@/views/mv")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  },
  {
    path: "/player",
    name: "player",
    component: () => import("@/views/player")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/user")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
