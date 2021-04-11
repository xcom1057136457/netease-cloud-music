<template>
  <el-container>
    <el-header>
      <div class="logo" @click="goIndex">
        <img src="../assets/img/logo.png" alt="" />
      </div>
      <div class="navBar">
        <el-menu
          :default-active="route.name"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#242424"
          text-color="#ccc"
          active-text-color="#fff"
          @select="handleSelect"
        >
          <el-submenu index="1">
            <template #title>发现音乐</template>
            <el-menu-item index="recommend">推荐</el-menu-item>
            <el-menu-item index="ranking">排行榜</el-menu-item>
            <el-menu-item index="songs">歌单</el-menu-item>
            <el-menu-item index="djradio">主播电台</el-menu-item>
            <el-menu-item index="artist">歌手</el-menu-item>
            <el-menu-item index="album">新碟上架</el-menu-item>
          </el-submenu>
          <el-menu-item index="mine">我的音乐</el-menu-item>
          <el-menu-item index="friend">朋友</el-menu-item>
          <el-menu-item index="shop">商城 </el-menu-item>
          <el-menu-item index="singer">音乐人</el-menu-item>
          <el-menu-item index="download">
            <el-badge value="HOT" class="item" type="danger">
              下载客户端
            </el-badge>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="mySet">
        <div>
          <el-input
            placeholder="音乐/视频/电台/用户"
            prefix-icon="el-icon-search"
            size="small"
            v-model="searchKey"
          ></el-input>
        </div>

        <div>
          <el-button type="default" round size="small" plain
            >创作者中心</el-button
          >
        </div>
      </div>
    </el-header>
    <el-main>
      <div class="contentWrapper">
        <router-view v-slot="{ Component }" v-if="$route.meta.keepAlive">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </el-main>
    <el-footer>
      <div class="footerWrapper">
        <div class="leftWrapper">
          <div>
            <span>服务条款</span>
            <el-divider direction="vertical"></el-divider>
            <span>隐私政策</span>
            <el-divider direction="vertical"></el-divider>
            <span>儿童隐私政策</span>
            <el-divider direction="vertical"></el-divider>
            <span>版权投诉指引</span>
            <el-divider direction="vertical"></el-divider>
            <span>意见反馈</span>
            <el-divider direction="vertical"></el-divider>
          </div>

          <div>
            <div>
              网易公司版权所有©1997-2020
              杭州乐读科技有限公司运营：浙网文[2018]3506-263号
            </div>

            <div>违法和不良信息举报电话：0571-89853516</div>
            <div>举报邮箱：ncm5990@163.com</div>
            <div>
              粤B2-20090191-18工业和信息化部备案管理系统网站浙公网安备
              33010902002564号
            </div>
          </div>
        </div>

        <div class="rightWrapper">
          <span class="el-icon-bicycle"></span>
          <span class="el-icon-baseball"></span>
          <span class="el-icon-wind-power"></span>
          <span class="el-icon-video-play"></span>
        </div>
      </div>
    </el-footer>
  </el-container>
  <songBar></songBar>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import songBar from "@/components/songBar";
export default {
  components: {
    songBar
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    let searchKey = ref("");

    function handleSelect(key) {
      if (key != "shop" && key != "singer" && key != "download") {
        router.push({
          name: key
        });
      }
    }

    function goIndex() {
      useRouter({
        path: "/"
      });
    }

    return {
      handleSelect,
      searchKey,
      goIndex,
      route
    };
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100%;

  .el-header {
    background-color: #242424;
    display: flex;
    align-items: center;

    > .logo {
      height: 60px;
      width: 190px;
      overflow: hidden;
      box-sizing: border-box;
      cursor: pointer;
      > img {
        width: 100%;
        height: 100%;
      }
    }

    > .navBar {
      flex: 1;
      margin-left: 20px;
      .item {
        ::v-deep .el-badge__content.is-fixed {
          top: 15px;
          right: -10px;
        }
      }
    }

    > .mySet {
      display: flex;
      align-items: center;
      > div {
        &:first-child {
          margin-right: 30px;
        }
      }
      .el-button {
        background-color: transparent;
        border: 1px solid #f0f0f0;
        color: #fff;
      }
    }
  }
}

.el-main {
  display: flex;
  flex-direction: column;
  padding: 0px;
}

.contentWrapper {
  background-color: #fff;
  flex: 1;
  overflow: auto;
  border-right: 1px solid #f0f0f0;
  border-left: 1px solid #f0f0f0;
  border-radius: 4px;
  width: 980px;
  margin: 0 auto;
}

.el-footer {
  border-top: 1px solid #dedede;
}
.footerWrapper {
  width: 980px;
  margin: 0 auto;
  font-size: 12px;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    flex: 0 0 290px;
    &:last-child {
      display: flex;
      > span {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        font-size: 40px;
        color: #a3a3a3;
        cursor: pointer;
      }
    }

    &:first-child {
      flex: 1;
      > div {
        margin-bottom: 5px;
        &:first-child {
          > span {
            cursor: pointer;
            transition-property: all;
            transition-duration: 0.3s;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        &:last-child {
          > div {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
