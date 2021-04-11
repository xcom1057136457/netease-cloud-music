<template>
  <div class="playDetailWrapper" v-loading="state.loading">
    <div class="leftWrapper">
      <div class="top-wrapper">
        <div class="image-wrapper">
          <img :src="playListDetail.coverImgUrl" alt="" />
        </div>

        <div class="detail-wrapper">
          <div>
            <div>
              <span>歌单</span>
              <span>{{ playListDetail.name }}</span>
            </div>
          </div>

          <div v-if="playListDetail.creator">
            <div class="avartar">
              <img :src="playListDetail.creator.avatarUrl" alt="" />
            </div>

            <div class="name">{{ playListDetail.creator.nickname }}</div>

            <div class="date">
              {{
                new Date(playListDetail.createTime).toLocaleString() + "创建"
              }}
            </div>
          </div>

          <div class="btns-wrapper">
            <el-button type="primary" size="small" icon="el-icon-video-play"
              >播放</el-button
            >

            <el-button icon="el-icon-folder-add" size="small">{{
              playListDetail.subscribedCount
            }}</el-button>

            <el-button size="small" icon="el-icon-share">{{
              playListDetail.shareCount
            }}</el-button>

            <el-button size="small" icon="el-icon-download">下载</el-button>
            <el-button size="small" icon="el-icon-s-comment">{{
              playListDetail.commentCount
            }}</el-button>
          </div>

          <div class="tag-wrapper">
            <div>
              <span>标签: </span>
              <span v-for="(item, index) in playListDetail.tags" :key="index">{{
                item
              }}</span>
            </div>
          </div>

          <div class="desc-wraper">
            <span>{{ playListDetail.description }}</span>
          </div>
        </div>
      </div>

      <div class="bottom-wrapper">
        <div class="topText">
          <div>
            <span>歌曲列表</span>
            <span>{{ playListDetail.trackCount + "首歌" }}</span>
          </div>

          <div>
            <span>播放: </span>
            <span>{{ playListDetail.playCount }}</span>
            <span> 次</span>
          </div>
        </div>

        <div class="bottom-table">
          <el-table :data="playListDetail.tracks" stripe border size="small">
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column label="歌曲标题" prop="name" show-overflow-tooltip>
              <template #default="record">
                <div class="table-item" @click="playHandler(record.row)">
                  <span class="el-icon-video-play"></span>
                  <span>{{ record.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时长" prop="name" show-overflow-tooltip>
              <template #default="record">
                {{ formatSeconds(record.row.pop) }}
              </template>
            </el-table-column>
            <el-table-column label="歌手" show-overflow-tooltip>
              <template #default="record">
                {{ record.row.ar.map(item => item.name).join("/") }}
              </template>
            </el-table-column>
            <el-table-column label="专辑" show-overflow-tooltip>
              <template #default="record">
                {{ record.row.al.name }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="comment-wrapper">
        <div class="top-text">
          最新评论 ({{ commentsDetail.length + hotCommentsDetail.length }})
        </div>
        <div class="comment-bottom-wrapper">
          <div v-for="(item, index) in hotCommentsDetail" :key="index">
            <div class="img-box">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="detail-box">
              <div>
                <span>{{ item.user.nickname + ": " }}</span>
                <span>{{ item.content }}</span>
              </div>

              <div>{{ new Date(item.time).toLocaleString() }}</div>
            </div>
          </div>

          <div v-for="(item, index) in commentsDetail" :key="index">
            <div class="img-box">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="detail-box">
              <div>
                <span>{{ item.user.nickname + ": " }}</span>
                <span>{{ item.content }}</span>
              </div>

              <div>{{ new Date(item.time).toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightWrapper">
      <div class="like-person">
        <div class="top-text">喜欢这个歌单的人</div>
        <div>
          <div v-for="(item, index) in subscribersDetail" :key="index">
            <div class="image-wrapper">
              <img :src="item.avatarUrl" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div class="like-play-list">
        <div class="top-text">相关推荐</div>
        <div class="bottom-text">
          <div
            v-for="(item, index) in playlistsDetail"
            :key="index"
            @click="changePlayList(item)"
          >
            <div class="image-box">
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <div>
              <div>{{ item.name }}</div>
              <div>{{ item.creator.nickname }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getPlayList,
  playlistSubscribers,
  simiPlaylist,
  commentPlaylist
} from "@/http/api";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let route = useRoute();
    // 获取歌单详情
    let playListDetail = ref({});
    let state = reactive({
      loading: true
    });
    let getPlayListDetail = async () => {
      state.loading = true;
      let { code, playlist } = await getPlayList(route.query);
      if (code == 200) {
        playListDetail.value = playlist;
        document.title = playListDetail.value.name;
      }
      state.loading = false;
    };

    // 获取歌单收藏者
    let subscribersDetail = ref([]);
    let getSubHandler = async () => {
      let params = {
        id: route.query.id,
        limit: 8,
        offset: 0
      };
      let { code, subscribers } = await playlistSubscribers(params);
      if (code == 200) {
        subscribersDetail.value = subscribers;
      }
    };

    // 获取相似歌单
    let playlistsDetail = ref([]);
    let simiPlaylistHandler = async () => {
      let { code, playlists } = await simiPlaylist(route.query);
      if (code == 200) {
        playlistsDetail.value = playlists;
      }
    };

    // 获取歌单评论
    let commentsDetail = ref([]);
    let hotCommentsDetail = ref([]);
    let commentPlaylistHandler = async () => {
      let { code, comments, hotComments } = await commentPlaylist(route.query);
      if (code == 200) {
        commentsDetail.value = comments;
        hotCommentsDetail.value = hotComments;
      }
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

    // 播放音乐
    const store = useStore();
    let playHandler = val => {
      store.dispatch("song/GetSongInfo", val);
      store.dispatch("song/GetUrlById", val.id);
    };

    // 更换歌单
    const router = useRouter();
    let changePlayList = val => {
      let query = {
        id: val.id
      };
      router.push({
        path: "/playlistDetail",
        query
      });
      setTimeout(() => {
        getPlayListDetail();
        getSubHandler();
        simiPlaylistHandler();
        commentPlaylistHandler();
      }, 0);
    };

    onMounted(() => {
      getPlayListDetail();
      getSubHandler();
      simiPlaylistHandler();
      commentPlaylistHandler();
    });

    return {
      playListDetail,
      subscribersDetail,
      playlistsDetail,
      commentsDetail,
      formatSeconds,
      hotCommentsDetail,
      playHandler,
      changePlayList,
      state
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color: rgb(194, 12, 12);

.playDetailWrapper {
  display: flex;
  > div {
    box-sizing: border-box;
  }
  .leftWrapper {
    flex: 0 0 710px;
    overflow: hidden;
    padding: 20px;
    border-right: 1px solid #f0f0f0;
    .top-wrapper {
      display: flex;
      .image-wrapper {
        flex: 0 0 208px;
        height: 208px;
        overflow: hidden;
        > img {
          width: 100%;
          height: 100%;
        }
      }

      .detail-wrapper {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        > div {
          flex: 1;
          &:nth-child(1) {
            display: flex;
            align-items: flex-start;
            > div {
              display: flex;
              align-items: center;
              > span {
                &:first-child {
                  background-color: $primary-color;
                  padding: 3px 10px;
                  font-size: 14px;
                  color: #fff;
                  margin-right: 10px;
                  display: inline-block;
                }
                &:last-child {
                  width: 346px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  font-size: 20px;
                }
              }
            }
          }

          &:nth-child(2) {
            display: flex;
            align-items: center;
            .avartar {
              width: 35px;
              height: 35px;
              overflow: hidden;
              margin-right: 10px;
              > img {
                width: 100%;
                height: 100%;
              }
            }

            .name {
              color: #0c73c2;
              font-size: 14px;
              margin-right: 30px;
            }

            .date {
              color: #a3a3a3;
              font-size: 14px;
            }
          }
        }
      }

      .btns-wrapper {
        display: flex;
        align-items: flex-end;
      }

      .tag-wrapper {
        display: flex;
        align-items: flex-end;
        padding-bottom: 10px;
        > div {
          display: flex;
          align-items: center;
          > span {
            &:first-child {
              font-size: 14px;
              margin-right: 10px;
            }
            &:not(:first-child) {
              font-size: 14px;
              display: inline-block;
              padding: 3px 10px;
              border: 1px solid #dedede;
              margin-right: 5px;
              cursor: pointer;
            }
          }
        }
      }

      .desc-wraper {
        font-size: 14px;
        > span {
          &:last-child {
            width: 440px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
        }
      }
    }

    .bottom-wrapper {
      margin-top: 20px;
      .topText {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid $primary-color;
        > div {
          &:first-child {
            > span {
              &:first-child {
                font-size: 16px;
                margin-right: 10px;
              }

              &:last-child {
                font-size: 14px;
                color: #a3a3a3;
              }
            }
          }

          &:last-child {
            > span {
              font-size: 14px;
              &:nth-child(2) {
                color: $primary-color;
              }
            }
          }
        }
      }

      .bottom-table {
        .table-item {
          display: flex;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
          > span {
            &:first-child {
              margin-right: 5px;
            }
            &:last-child {
              transition-property: all;
              transition-duration: 0.3s;
              &:hover {
                text-decoration: underline;
                color: $primary-color;
              }
            }
          }
        }
      }
    }

    .comment-wrapper {
      margin-top: 20px;
      .top-text {
        padding-bottom: 10px;
        border-bottom: 1px solid $primary-color;
      }

      .comment-bottom-wrapper {
        margin-top: 0;
        > div {
          display: flex;
          margin: 20px 0;
          .img-box {
            flex: 0 0 50px;
            height: 50px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }

          .detail-box {
            margin-left: 10px;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            > div {
              &:first-child {
                margin-bottom: 10px;
                line-height: 1.6em;
                > span {
                  &:first-child {
                    color: #0c73c2;
                  }
                }
              }

              &:last-child {
                font-size: 12px;
                color: #a3a3a3;
              }
            }
          }
        }
      }
    }
  }
  .rightWrapper {
    flex: 0 0 270px;
    box-sizing: border-box;
    padding: 20px;
    .like-person {
      .top-text {
        font-size: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
      }
      > div:last-child {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
        > div {
          flex: 0 0 25%;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          > .image-wrapper {
            width: 40px;
            height: 40px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .like-play-list {
      > .top-text {
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f0f0;
      }
      > .bottom-text {
        margin-top: 10px;
        > div {
          display: flex;
          margin-bottom: 10px;
          cursor: pointer;
          .image-box {
            flex: 0 0 50px;
            height: 50px;
            img {
              width: 100%;
              height: 100%;
            }
          }

          > div:last-child {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 5px;
            > div {
              &:nth-child(1) {
                font-size: 14px;
                width: 175px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
              }

              &:last-child {
                font-size: 12px;
                color: #a3a3a3;
              }
            }
          }
        }
      }
    }
  }
}
</style>
