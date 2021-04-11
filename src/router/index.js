import { createRouter, createWebHashHistory } from "vue-router";
import index from "@/views/index";
const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: index,
    redirect: "/recommend",
    children: [
      {
        path: "/artist",
        name: "artist",
        component: () => import("@/views/artist"),
        meta: {
          title: "发现音乐-歌手",
          keepAlive: true
        }
      },
      {
        path: "/djradio",
        name: "djradio",
        component: () => import("@/views/djradio"),
        meta: {
          title: "发现音乐-主播电台",
          keepAlive: true
        }
      },
      {
        path: "/ranking",
        name: "ranking",
        component: () => import("@/views/ranking"),
        meta: {
          title: "发现音乐-排行榜",
          keepAlive: true
        }
      },
      {
        path: "/recommend",
        name: "recommend",
        component: () => import("@/views/recommend"),
        meta: {
          title: "发现音乐-推荐",
          keepAlive: false
        }
      },
      {
        path: "/songs",
        name: "songs",
        component: () => import("@/views/songs"),
        meta: {
          title: "发现音乐-歌单",
          keepAlive: true
        }
      },
      {
        path: "/album",
        name: "album",
        component: () => import("@/views/album"),
        meta: {
          title: "发现音乐-新碟上架",
          keepAlive: true
        }
      },
      {
        path: "/mine",
        name: "mine",
        component: () => import("@/views/mine"),
        meta: {
          title: "我的音乐",
          keepAlive: true
        }
      },
      {
        path: "/friend",
        name: "friend",
        component: () => import("@/views/friend"),
        meta: {
          title: "朋友",
          keepAlive: true
        }
      },
      {
        path: "/playlistDetail",
        name: "playlistDetail",
        component: () => import("@/views/playListDetail"),
        meta: {
          title: "歌单详情",
          keepAlive: false
        }
      },
      {
        path: "/albumDetail",
        name: "albumDetail",
        component: () => import("@/views/albumDetail"),
        meta: {
          title: "专辑详情",
          keepAlive: false
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  /*路由发生改变修改页面的title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
  setTimeout(() => {
    window.scroll(0, 0);
  }, 0);
});

export default router;
