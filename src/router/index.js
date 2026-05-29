import { createRouter, createWebHashHistory } from "vue-router";

import Layout from "@/layout/index.vue";

import ImageArray from "@/views/ImageArray/index.vue";
import ComicViewer from "@/views/comicViewer/index.vue";

export const AsyncRouter = [
  {
    path: "/images",
    component: ImageArray,
    name: "ImageArray",
  },
  {
    path: "/comicViewer",
    component: ComicViewer,
    name: "comicViewer",
  },
];

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "home",
        component: () => import("@/views/content/index.vue"),
      },
    ],
  },
  ...AsyncRouter,
];

const Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export const router = Router;
