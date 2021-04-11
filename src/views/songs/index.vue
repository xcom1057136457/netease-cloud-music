<template>
  <div class="topText">
    <div>
      <span class="el-icon-s-promotion"></span>
      <span>{{ pageParams.cat }}</span>
      <el-popover placement="bottom" :width="600" trigger="click">
        <template #reference>
          <el-button size="small">
            选择分类
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </template>
        <div class="select-wrapper">
          <div class="all-wrapper">
            <el-button size="small" @click="allChange">全部风格</el-button>
          </div>
          <div class="language-wrapper">
            <div v-for="(item, index) in categoriesList" :key="index">
              <div class="left-wrapper">
                <span class="el-icon-mic" v-if="index == 0"></span>
                <span class="el-icon-guide" v-else-if="index == 1"></span>
                <span class="el-icon-milk-tea" v-else-if="index == 2"></span>
                <span
                  class="el-icon-goblet-square-full"
                  v-else-if="index == 3"
                ></span>
                <span class="el-icon-light-rain" v-else></span>
                {{ item }}
              </div>
              <div class="right-wrapper">
                <div
                  v-for="(actItem, actIndex) in subList"
                  :key="actIndex"
                  v-show="actItem.category == index"
                  @click="changeCat(actItem)"
                >
                  <span>{{ actItem.name }}</span>
                  <el-divider direction="vertical"></el-divider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-popover>
    </div>

    <div>
      <span>热门</span>
    </div>
  </div>

  <div class="bottomWrapper" v-loading="state.listLoading">
    <div
      v-for="(item, index) in playList"
      :key="index"
      @click="goPlayList(item)"
    >
      <div class="imageWrapper">
        <img :src="item.coverImgUrl" alt="" />
        <div
          class="imageBar"
          :style="{ backgroundImage: `url(${item.coverImgUrl})` }"
        ></div>
        <div class="barText">
          <div>
            <span class="el-icon-headset"></span>
            <span>{{ countFormat(item.playCount) }}</span>
          </div>

          <div>
            <span class="el-icon-video-play"></span>
          </div>
        </div>
      </div>
      <div class="detail-info">
        <div>{{ "by-" + item.name }}</div>
        <div>{{ "by-" + item.creator.nickname }}</div>
      </div>
    </div>
  </div>

  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.offset"
      :page-size="pageParams.limit"
      :page-sizes="[35, 40, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageParams.total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { topPlaylist, playlistCatlist } from "@/http/api";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    // 获取歌单信息
    let playList = ref([]);
    let state = reactive({
      listLoading: true
    });
    let pageParams = reactive({
      limit: 35,
      offset: 0,
      total: 0,
      cat: "全部"
    });
    let getPlayListHandler = async () => {
      state.listLoading = true;
      let { code, playlists, total } = await topPlaylist(pageParams);
      if (code == 200) {
        pageParams.total = total;
        playList.value = playlists;
      }
      window.scrollTo(0, 0);
      state.listLoading = false;
    };

    // 数据转化
    let countFormat = val => {
      let str = String(val);
      if (str.length <= 4) {
        return val;
      } else {
        return str.substring(0, str.length - 4) + "万";
      }
    };

    // 分页
    let handleCurrentChange = val => {
      pageParams.offset = val;
      getPlayListHandler();
    };

    let handleSizeChange = val => {
      pageParams.limit = val;
      getPlayListHandler();
    };

    // 获取分类信息
    let allList = ref([]);
    let categoriesList = ref([]);
    let subList = ref([]);
    let getCategoryHandler = async () => {
      let { code, all, categories, sub } = await playlistCatlist();
      if (code == 200) {
        allList.value = all;
        categoriesList.value = categories;
        subList.value = sub;
      }
    };

    // 更换类别
    let changeCat = val => {
      pageParams.cat = val.name;
      getPlayListHandler();
    };
    let allChange = () => {
      pageParams.cat = "全部";
      getPlayListHandler();
    };

    // 获取歌单详情
    const router = useRouter();
    let goPlayList = val => {
      router.push({
        path: "/playlistDetail",
        query: {
          id: val.id
        }
      });
    };

    onMounted(() => {
      getPlayListHandler();
      getCategoryHandler();
    });

    return {
      playList,
      countFormat,
      pageParams,
      handleCurrentChange,
      handleSizeChange,
      state,
      allList,
      categoriesList,
      subList,
      changeCat,
      allChange,
      goPlayList
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color: rgb(194, 12, 12);

.topText {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 20px 10px 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $primary-color;
  > div {
    display: flex;
    align-items: center;
    &:nth-child(1) {
      > span {
        &:first-child {
          color: $primary-color;
          margin-right: 5px;
          font-size: 20px;
        }

        &:nth-child(2) {
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }

    &:nth-child(2) {
      font-size: 14px;
      cursor: pointer;
      color: $primary-color;
    }
  }
}

.bottomWrapper {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex: 0 0 20%;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 0;
    .imageWrapper {
      width: 140px;
      height: 140px;
      overflow: hidden;
      position: relative;
      .imageBar {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-repeat: no-repeat;
        background-size: 100%;
        height: 20px;
        &::after {
          content: "";
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          background: inherit;
          filter: blur(6px);
          z-index: 1;
        }
      }
      .barText {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 12px;
        color: #fff;
        z-index: 2;
        line-height: 18px;
        padding: 0 5px;
        background-color: transparent;
        display: flex;
        justify-content: space-between;
        > div {
          &:first-child {
            > span {
              margin-right: 5px;
            }
          }
        }
      }
      > img {
        width: 100%;
        height: 100%;
      }
    }

    .detail-info {
      > div {
        &:first-child {
          width: 150px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          margin: 5px 0;
        }

        &:last-child {
          width: 150px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          color: #a3a3a3;
        }
      }
    }
  }
}

.pagination {
  margin: 10px;
  text-align: right;
}

.el-popover {
  .select-wrapper {
    > .all-wrapper {
      padding-bottom: 5px;
      border-bottom: 1px solid #f0f0f0;
    }
  }

  .language-wrapper {
    margin-top: 10px;
    > div {
      display: flex;
      margin-bottom: 8px;
      > .left-wrapper {
        margin-right: 10px;
        flex: 0 0 70px;
        font-size: 16px;
        display: flex;
        > span {
          font-size: 18px;
          margin-right: 5px;
        }
      }
      > .right-wrapper {
        > div {
          display: inline-block;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
