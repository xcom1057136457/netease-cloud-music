<template>
  <div class="album-box" v-loading="state.loading">
    <!-- S 左侧内容 -->
    <div class="left-wrapper">
      <div class="top-box">
        <div class="image-box">
          <img :src="albumData.picUrl" alt="" />
        </div>

        <div class="detail-box" v-if="albumData.artists">
          <div>
            <span>专辑</span>
            <span>{{ albumData.name }}</span>
          </div>

          <div>
            <span>歌手: </span>
            <span>{{
              albumData.artists.map(item => item.name).join(" / ")
            }}</span>
          </div>

          <div>
            <span>发行时间: </span>
            <span>{{
              moment(new Date(albumData.publishTime)).format("yyyy-MM-DD")
            }}</span>
          </div>

          <div>
            <span>发行公司: </span>
            <span>{{ albumData.company }}</span>
          </div>

          <div>
            <el-button type="primary" size="small" icon="el-icon-video-play"
              >播放</el-button
            >

            <el-button icon="el-icon-folder-add" size="small">{{
              albumDetailList.subCount
            }}</el-button>

            <el-button size="small" icon="el-icon-share">{{
              albumDetailList.shareCount
            }}</el-button>

            <el-button size="small" icon="el-icon-download">下载</el-button>
            <el-button size="small" icon="el-icon-s-comment">{{
              albumDetailList.commentCount
            }}</el-button>
          </div>
        </div>
      </div>

      <div class="desc-box">
        <div>专辑介绍:</div>
        <div>{{ albumData.description }}</div>
      </div>

      <div class="song-box">
        <div class="top-text">
          <span>包含歌曲列表</span>
          <span>{{ songsData.length + "首歌" }}</span>
        </div>

        <div class="table-wrapper">
          <el-table :data="songsData" size="small" stripe border>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column
              label="歌曲标题"
              show-overflow-tooltip
              width="300px"
            >
              <template #default="record">
                <div class="table-item" @click="playHandler(record.row)">
                  <span class="el-icon-video-play"></span>
                  <span>{{ record.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="时长" show-overflow-tooltip>
              <template #default="record">
                {{ timeFormate(record.row.pop) }}
              </template>
            </el-table-column>
            <el-table-column label="歌手" show-overflow-tooltip>
              <template #default="record">
                {{ record.row.ar.map(item => item.name).join(" / ") }}
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="comment-box">
        <div class="top-text">
          <span>评论</span>
          <span>{{ "共" + commentData.total + "条评论" }}</span>
        </div>

        <div class="comment-bottom-wrapper">
          <div v-for="(item, index) in commentData.hotComments" :key="index">
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

          <div v-for="(item, index) in commentData.comments" :key="index">
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

        <div class="paganition-box">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="commnetParams.offset + 1"
            :page-sizes="[20, 30, 50, 100]"
            :page-size="commnetParams.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="commentData.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- E 左侧内容 -->

    <!-- S 右侧内容 -->
    <div class="right-wrapper">
      <div class="other-album">
        <div class="top-text">Ta的其他热门专辑</div>
        <div class="bottom-text">
          <div
            v-for="(item, index) in hotAlbumsData"
            :key="index"
            @click="changeAlbum(item.id)"
          >
            <div class="image-box">
              <img :src="item.picUrl" alt="" />
            </div>
            <div>
              <div>{{ item.name }}</div>
              <div>{{ item.artist.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- E 右侧内容 -->
  </div>
</template>

<script>
import {
  albumDetail,
  commentAlbum,
  albumDetailDynamic,
  artistAlbum
} from "@/http/api";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { timeFormate } from "@/utils/tools";
import { useStore } from "vuex";
import moment from "moment";
export default {
  setup() {
    const route = useRoute();

    // 获取专辑详情
    let albumData = ref([]);
    let songsData = ref([]);
    let state = reactive({
      loading: true
    });
    let albumDetailHandler = async () => {
      state.loading = true;
      let { code, album, songs } = await albumDetail(route.query);
      if (code == 200) {
        albumData.value = album;
        songsData.value = songs;
        await artistAlbumHandler(album.artist.id);
      }
      state.loading = false;
    };

    // 获取专辑评论
    let commentData = reactive({
      comments: [],
      hotComments: [],
      total: 0
    });
    let commnetParams = reactive({
      id: route.query.id,
      limit: 20,
      offset: 0
    });
    let commentAlbumHandler = async () => {
      let { code, comments, hotComments, total } = await commentAlbum(
        commnetParams
      );
      if (code == 200) {
        commentData.comments = comments;
        commentData.hotComments = hotComments;
        commentData.total = total;
      }
    };

    // 获取专辑动态信息
    let albumDetailList = reactive({
      commentCount: 0,
      shareCount: 0,
      subCount: 0
    });
    let albumDetailDynamicHandler = async () => {
      let {
        code,
        commentCount,
        shareCount,
        subCount
      } = await albumDetailDynamic(route.query);
      if (code == 200) {
        albumDetailList.commentCount = commentCount;
        albumDetailList.shareCount = shareCount;
        albumDetailList.subCount = subCount;
      }
    };

    // 获取歌手专辑
    let hotAlbumsData = ref([]);
    let artistAlbumHandler = val => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        let { code, hotAlbums } = await artistAlbum({
          id: val,
          limit: 5
        });
        if (code == 200) {
          hotAlbumsData.value = hotAlbums;
          resolve();
        } else {
          reject();
        }
      });
    };

    // 播放音乐
    const store = useStore();
    let playHandler = val => {
      store.dispatch("song/GetSongInfo", val);
      store.dispatch("song/GetUrlById", val.id);
    };

    // 分页
    let handleSizeChange = val => {
      commnetParams.limit = val;
      commentAlbumHandler();
    };

    let handleCurrentChange = val => {
      commnetParams.offset = val - 1;
      commentAlbumHandler();
    };

    // 更换专辑
    const router = useRouter();
    let changeAlbum = id => {
      router.push({
        name: "albumDetail",
        query: {
          id
        }
      });
      setTimeout(() => {
        albumDetailHandler();
        commentAlbumHandler();
        albumDetailDynamicHandler();
      }, 0);
    };

    onMounted(() => {
      albumDetailHandler();
      commentAlbumHandler();
      albumDetailDynamicHandler();
    });

    return {
      albumData,
      songsData,
      commentData,
      albumDetailList,
      timeFormate,
      playHandler,
      moment,
      handleSizeChange,
      handleCurrentChange,
      commnetParams,
      hotAlbumsData,
      changeAlbum,
      state
    };
  }
};
</script>

<style lang="scss" scoped>
$primary-color: rgb(194, 12, 12);

.album-box {
  display: flex;
  > div {
    box-sizing: border-box;
    overflow: hidden;
  }
  .right-wrapper {
    flex: 0 0 270px;
    padding: 20px;
    .other-album {
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
  .left-wrapper {
    flex: 0 0 710px;
    padding: 20px;
    border-right: 1px solid #f0f0f0;
    .top-box {
      display: flex;

      .image-box {
        flex: 0 0 208px;
        height: 208px;
        margin-right: 10px;
        > img {
          width: 100%;
          height: 100%;
        }
      }

      .detail-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        > div {
          &:nth-child(1) {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            > span {
              &:first-child {
                font-size: 14px;
                padding: 3px 10px;
                background-color: $primary-color;
                color: #fff;
                display: inline-block;
                margin-right: 10px;
              }

              &:last-child {
                font-size: 20px;
              }
            }
          }

          &:nth-child(2) {
            margin-bottom: 10px;
            font-size: 14px;
            > span {
              &:not(:first-child) {
                color: #0c73c2;
              }
            }
          }

          &:nth-child(3) {
            font-size: 14px;
            margin-bottom: 10px;
          }

          &:nth-child(4) {
            font-size: 14px;
          }

          &:nth-child(5) {
            flex: 1;
            display: flex;
            align-items: flex-end;
          }
        }
      }
    }

    .desc-box {
      margin-top: 20px;
      font-size: 14px;
      > div {
        &:first-child {
          font-weight: bold;
        }

        &:last-child {
          line-height: 1.5em;
          text-indent: 2em;
          margin-top: 10px;
        }
      }
    }

    .song-box {
      margin-top: 20px;
      .top-text {
        padding-bottom: 10px;
        border-bottom: 1px solid $primary-color;
        > span {
          &:first-child {
            font-size: 20px;
            margin-right: 10px;
          }

          &:last-child {
            font-size: 14px;
            color: #a3a3a3;
          }
        }
      }

      .table-wrapper {
        .table-item {
          cursor: pointer;
          > span {
            &:last-child {
              margin-left: 5px;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }

    .comment-box {
      margin-top: 20px;
      .top-text {
        padding-bottom: 10px;
        border-bottom: 1px solid $primary-color;
        > span {
          &:first-child {
            font-size: 20px;
            margin-right: 10px;
          }

          &:last-child {
            font-size: 14px;
            color: #a3a3a3;
          }
        }
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
}
</style>
