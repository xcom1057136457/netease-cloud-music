<template>
  <div class="rightWrapper">
    <div class="topWrapper">
      <div class="imageWrapper">
        <img :src="detail.coverImgUrl" alt="" />
      </div>
      <div class="detailWrapper">
        <div>
          <div>
            {{ detail.name ? detail.name : " " }}
          </div>
          <div>
            <span class="el-icon-time"></span>
            <span>{{
              "最近更新: " + new Date(detail.updateTime).toLocaleString()
            }}</span>
          </div>
        </div>
        <div>
          <el-button type="primary" icon="el-icon-video-play" size="small"
            >播放</el-button
          >
          <el-button type="default" size="small" icon="el-icon-folder-add">
            {{ detail.subscribedCount }}
          </el-button>
          <el-button size="small" icon="el-icon-paperclip">{{
            songDetailList.shareCount
          }}</el-button>
          <el-button size="small" icon="el-icon-download">下载</el-button>
          <el-button size="small" icon="el-icon-chat-line-round">{{
            songDetailList.commentCount
          }}</el-button>
        </div>
      </div>
    </div>
    <div class="songDetail">
      <div class="topText">
        <div>歌曲列表</div>
        <div>
          <span>播放: </span>
          <span>{{ songDetailList.playCount }}</span>
          <span>次</span>
        </div>
      </div>

      <div class="tableWrapper">
        <el-table :data="songDetailList.tracks" stripe size="small" border>
          <el-table-column type="index" align="center"></el-table-column>
          <el-table-column label="标题" show-overflow-tooltip width="320">
            <template #default="record">
              <div class="tableTdWrapper">
                <div class="imageWrapper" v-if="record.$index < 3">
                  <img :src="record.row.al.picUrl" alt="" />
                </div>
                <div
                  class="nameWrapper"
                  @click="playSongHandler(record.row.id, record.row)"
                >
                  <span class="el-icon-video-play"></span>
                  <span>{{ record.row.al.name }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="时长">
            <template #default="record">
              {{ formatSeconds(record.row.pop) }}
            </template>
          </el-table-column>
          <el-table-column label="歌手" show-overflow-tooltip>
            <template #default="record">
              {{ record.row.ar.[0].name }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { getPlayList } from "@/http/api";
import { useStore } from "vuex";
export default {
  props: {
    detailList: {
      default: () => {
        return {};
      }
    }
  },
  setup(props, context) {
    watch(props, newVal => {
      detail.value = newVal.detailList;
      getSongListHandler();
    });

    // 获取歌曲详情
    var detail = ref({});
    let songDetailList = ref({});
    let songInfoList = ref([]);
    let getSongListHandler = async () => {
      context.emit("toggleLoading", true);
      let params = {
        id: detail.value.id
      };
      let { code, playlist, privileges } = await getPlayList(params);
      if (code == 200) {
        songDetailList.value = playlist;
        songInfoList.value = privileges;
      }
      context.emit("toggleLoading", false);
    };

    // 格式化时间
    let formatSeconds = value => {
      var theTime = parseInt(value); // 秒
      var middle = 0; // 分
      var hour = 0; // 小时

      if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (middle > 0) {
        result = "" + parseInt(middle) + "分" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
      }
      return result;
    };

    // 播放歌曲
    const store = useStore();
    let playSongHandler = (id, item) => {
      store.dispatch("song/GetUrlById", id);
      store.dispatch("song/GetSongInfo", item);
    };

    return {
      detail,
      songDetailList,
      getSongListHandler,
      formatSeconds,
      songInfoList,
      playSongHandler
    };
  }
};
</script>

<style lang="scss" scoped>
.topWrapper {
  display: flex;
  .imageWrapper {
    width: 150px;
    height: 150px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .detailWrapper {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    > div {
      flex: 1;
      &:nth-child(1) {
        > div {
          &:first-child {
            font-size: 16px;
            margin-bottom: 15px;
          }

          &:last-child {
            font-size: 14px;
            color: #a3a3a3;
            display: flex;
            align-items: center;
            > span {
              margin-right: 5px;
            }
          }
        }
      }

      &:nth-child(2) {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}

.songDetail {
  margin-top: 20px;
  .topText {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(194, 12, 12);
    padding-bottom: 10px;
    > div {
      &:first-child {
        font-size: 16px;
      }
      &:last-child {
        font-size: 12px;
        > span {
          &:nth-child(2) {
            color: rgb(194, 12, 12);
            margin-right: 2px;
          }
        }
      }
    }
  }
}

.tableTdWrapper {
  display: flex;
  align-items: center;
  .imageWrapper {
    width: 50px;
    height: 50px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .nameWrapper {
    flex: 1;
    margin-left: 10px;
    > span {
      margin-right: 5px;
      cursor: pointer;
      transition-property: all;
      transition-duration: 0.3s;
      &:last-child {
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
