<template>
  <div class="topBanner">
    <div class="banner">
      <el-carousel
        indicator-position="none"
        :interval="4000"
        height="270px"
        trigger="click"
        @change="bannerChange"
      >
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <el-image
            :src="item.imageUrl"
            fit="cover"
            style="width: 100%; height: 100%"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="downloadImage">
      <img src="@/assets/img/download.png" alt="" />
    </div>

    <div class="bgBanner" id="bgBanner"></div>
  </div>

  <div class="bottomWrapper">
    <div class="leftWrapper">
      <!-- S 热门推荐 -->
      <div class="hotWrapper">
        <div class="topText">
          <div class="leftText">
            <div>
              <i class="el-icon-s-promotion"></i>
              热门推荐
            </div>
            <div>
              <span>华语</span>
              <el-divider direction="vertical"></el-divider>
              <span>流行</span>
              <el-divider direction="vertical"></el-divider>
              <span>摇滚</span>
              <el-divider direction="vertical"></el-divider>
              <span>民谣</span>
              <el-divider direction="vertical"></el-divider>
              <span>电子</span>
              <el-divider direction="vertical"></el-divider>
            </div>
          </div>

          <div class="rightText">
            <span>更多</span>
            <span>
              <i class="el-icon-right"></i>
            </span>
          </div>
        </div>
        <div class="bottomWrapper">
          <el-row>
            <el-col
              :span="6"
              v-for="(item, index) in personalizedList"
              :key="index"
              @click="goPlayList(item)"
            >
              <div class="topImage">
                <img :src="item.picUrl" alt="" />
                <div
                  class="count"
                  :style="{ backgroundImage: `url(${item.picUrl})` }"
                >
                  <div class="left">
                    <span class="el-icon-headset"></span>
                    <span>{{ countFilter(item.playCount) }}</span>
                  </div>
                  <div class="right">
                    <span class="el-icon-video-play"></span>
                  </div>
                </div>
              </div>
              <div class="bottomDetail">
                <div>{{ item.name }}</div>
                <div>{{ item.copywriter }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- E 热门推荐 -->

      <!-- S 新碟上架 -->
      <div class="news">
        <div class="topText">
          <div class="leftText">
            <div>
              <i class="el-icon-s-promotion"></i>
              新碟上架
            </div>
          </div>

          <div class="rightText">
            <span>更多</span>
            <span>
              <i class="el-icon-right"></i>
            </span>
          </div>
        </div>

        <div class="newsBannerWrapper">
          <el-carousel
            indicator-position="none"
            :interval="5000"
            arrow="always"
            height="186px"
          >
            <el-carousel-item class="newsItem">
              <div
                v-for="(item, index) in newsList1"
                :key="index"
                @click="goAlbumDetail(item)"
              >
                <div class="imageWrapper">
                  <img :src="item.picUrl" alt="" />
                </div>
                <div class="detailWrapper">
                  <div>{{ item.name }}</div>
                  <div v-if="item.artist">{{ item.artist.name }}</div>
                </div>
              </div>
            </el-carousel-item>

            <el-carousel-item class="newsItem">
              <div
                v-for="(item, index) in newsList2"
                :key="index"
                @click="goAlbumDetail(item)"
              >
                <div class="imageWrapper">
                  <img :src="item.picUrl" alt="" />
                </div>
                <div class="detailWrapper">
                  <div>{{ item.name }}</div>
                  <div v-if="item.artist">{{ item.artist.name }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- E 新碟上架 -->

      <!-- S 榜单 -->
      <div class="topListWrapper">
        <div class="topText">
          <div class="leftText">
            <div>
              <i class="el-icon-s-promotion"></i>
              榜单
            </div>
          </div>

          <div class="rightText">
            <span>更多</span>
            <span>
              <i class="el-icon-right"></i>
            </span>
          </div>
        </div>

        <div class="topListDetail" v-loading="topListLoading">
          <div class="topItem">
            <div>
              <div class="imageWrapper">
                <img :src="topListArr1.coverImgUrl" alt="" />
              </div>
              <div>
                <div>{{ topListArr1.name }}</div>
                <div>
                  <span class="el-icon-video-play"></span>
                  <span class="el-icon-folder-add"></span>
                </div>
              </div>
            </div>

            <div>
              <div
                v-for="(item, index) in topListArr1.tracks"
                :key="index"
                @click="playHandler(item)"
              >
                <span>{{ index + 1 + ". " }}</span>
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div @click="goRanking(0)">
              <span>查看更多</span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>

          <div class="topItem">
            <div>
              <div class="imageWrapper">
                <img :src="topListArr2.coverImgUrl" alt="" />
              </div>
              <div>
                <div>{{ topListArr2.name }}</div>
                <div>
                  <span class="el-icon-video-play"></span>
                  <span class="el-icon-folder-add"></span>
                </div>
              </div>
            </div>

            <div>
              <div
                v-for="(item, index) in topListArr2.tracks"
                :key="index"
                @click="playHandler(item)"
              >
                <span>{{ index + 1 + ". " }}</span>
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div @click="goRanking(1)">
              <span>查看更多</span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>

          <div class="topItem">
            <div>
              <div class="imageWrapper">
                <img :src="topListArr3.coverImgUrl" alt="" />
              </div>
              <div>
                <div>{{ topListArr3.name }}</div>
                <div>
                  <span class="el-icon-video-play"></span>
                  <span class="el-icon-folder-add"></span>
                </div>
              </div>
            </div>

            <div>
              <div
                v-for="(item, index) in topListArr3.tracks"
                :key="index"
                @click="playHandler(item)"
              >
                <span>{{ index + 1 + ". " }}</span>
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div @click="goRanking(2)">
              <span>查看更多</span>
              <span class="el-icon-arrow-right"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- E 榜单 -->
    </div>

    <div class="rightWrapper">
      <div class="loginWrapper">
        <div>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</div>
        <div>
          <div>用户登录</div>
        </div>
      </div>

      <div class="singerWrapper">
        <div class="topText">
          <div>入驻歌手</div>
          <div>
            <span>查看全部</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>

        <div class="artistWrapper">
          <div v-for="(item, index) in artistList" :key="index">
            <div class="imageWrapper">
              <img :src="item.img1v1Url" alt="" />
            </div>
            <div>
              <div>{{ item.name }}</div>
              <div>流行歌手</div>
            </div>
          </div>
        </div>
      </div>

      <div class="hotSingerWrapper">
        <div class="topText">
          <div>热门主播</div>
          <div>
            <span>查看全部</span>
            <span class="el-icon-arrow-right"></span>
          </div>
        </div>

        <div class="artistWrapper">
          <div v-for="(item, index) in djPopular.list" :key="index">
            <div class="imageWrapper">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div>
              <div>{{ item.nickName }}</div>
              <div>{{ "第" + item.rank + "名" }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getBannerData,
  getPersonalized,
  getNews,
  getArtistList,
  getDjPopular,
  getToplist,
  getPlayList
} from "@/http/api";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    let bannerList = ref([""]);
    // 获取bannner信息
    let getBannerHandler = async () => {
      let { code, banners } = await getBannerData({
        type: "0"
      });
      if (code == 200) {
        bannerList.value = banners;
        let bgBanner = document.getElementById("bgBanner");
        bgBanner.style.backgroundImage = `url(${bannerList.value[0].imageUrl})`;
      }
    };

    // 获取banner所在index
    let bannerChange = index => {
      let bgBanner = document.getElementById("bgBanner");
      bgBanner.style.backgroundImage = `url(${bannerList.value[index].imageUrl})`;
    };

    // 获取推荐歌单
    let personalizedParams = ref({
      limit: 8
    });
    let personalizedList = ref([]);
    let getPersonalizedHandler = async () => {
      let { code, result } = await getPersonalized(personalizedParams.value);
      if (code == 200) {
        personalizedList.value = result;
      }
    };

    // 转换单位
    let countFilter = val => {
      let str = val.toString();
      str = str.substr(0, str.length - 4);
      return str + "万";
    };

    // 获取新碟上架
    let newsList1 = ref([""]);
    let newsList2 = ref([""]);
    let getNewsHandler = async () => {
      let arr1 = [];
      let arr2 = [];
      let { code, albums } = await getNews();
      if (code == 200) {
        for (let i = 0; i < 5; i++) {
          arr1.push(albums[i]);
        }
        for (let i = 5; i < 10; i++) {
          arr2.push(albums[i]);
        }
        newsList1.value = arr1;
        newsList2.value = arr2;
      }
    };

    // 入驻歌手
    let artistParams = ref({
      limit: 5
    });
    let artistList = ref([]);
    let getArtistListHandler = async () => {
      let { code, artists } = await getArtistList(artistParams.value);
      if (code) {
        artistList.value = artists;
      }
    };

    // 热门主播
    let djPopular = ref([]);
    let getDjPopularHandler = async () => {
      let { code, data } = await getDjPopular({
        limit: 5
      });
      if (code == 200) {
        djPopular.value = data;
      }
    };

    // 获取榜单
    let topIdList = ref([]);
    let topListArr1 = ref([]);
    let topListArr2 = ref([]);
    let topListArr3 = ref([]);
    let topListLoading = ref(false);
    let getTopIdHandler = () => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        let { code, list } = await getToplist();
        if (code == 200) {
          for (let i = 0; i < 3; i++) {
            topIdList.value.push(list[i]);
          }
          resolve();
        } else {
          reject();
        }
      });
    };
    let getTopListHandler = async () => {
      topListLoading.value = true;
      await getTopIdHandler();
      let { code, playlist } = await getPlayList({
        id: topIdList.value[0].id
      });
      if (code == 200) {
        let arr = [];
        topListArr1.value = playlist;
        for (let i = 0; i < 10; i++) {
          arr[i] = topListArr1.value.tracks[i];
        }
        topListArr1.value.tracks = arr;
      }

      let res = await getPlayList({
        id: topIdList.value[1].id
      });
      if (res.code == 200) {
        let arr = [];
        topListArr2.value = res.playlist;
        for (let i = 0; i < 10; i++) {
          arr[i] = topListArr2.value.tracks[i];
        }
        topListArr2.value.tracks = arr;
      }

      let res2 = await getPlayList({
        id: topIdList.value[2].id
      });
      if (res2.code == 200) {
        let arr = [];
        topListArr3.value = res2.playlist;
        for (let i = 0; i < 10; i++) {
          arr[i] = topListArr3.value.tracks[i];
        }
        topListArr3.value.tracks = arr;
      }

      topListLoading.value = false;
    };

    // 去往榜单
    const router = useRouter();
    let goRanking = val => {
      router.push({
        name: "ranking",
        params: {
          type: val
        }
      });
    };

    // 播放音乐
    const store = useStore();
    let playHandler = item => {
      store.dispatch("song/GetUrlById", item.id);
      store.dispatch("song/GetSongInfo", item);
    };

    // 去往歌单详情
    let goPlayList = val => {
      router.push({
        name: "playlistDetail",
        query: {
          id: val.id
        }
      });
    };

    // 去往专辑详情
    let goAlbumDetail = val => {
      router.push({
        name: "albumDetail",
        query: {
          id: val.id
        }
      });
    };

    onMounted(() => {
      getBannerHandler();
      getPersonalizedHandler();
      getNewsHandler();
      getArtistListHandler();
      getDjPopularHandler();
      getTopListHandler();
    });

    return {
      bannerList,
      bannerChange,
      personalizedList,
      countFilter,
      newsList1,
      newsList2,
      artistList,
      djPopular,
      topListArr1,
      topListArr2,
      topListArr3,
      topListLoading,
      goRanking,
      playHandler,
      goPlayList,
      goAlbumDetail
    };
  }
};
</script>

<style lang="scss" scoped>
$primaryColor: rgb(193, 13, 12);

.topBanner {
  display: flex;
  align-items: center;
  .banner {
    flex: 1;
  }
  .downloadImage {
    flex: 0 0 250px;
    height: 270px;
    z-index: 1;
    cursor: pointer;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .bgBanner {
    position: absolute;
    left: 0;
    right: 0;
    height: 270px;
    z-index: 0;
    background-repeat: no-repeat;
    background-size: cover;
    box-sizing: border-box;
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: linear;
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: inherit;
      filter: blur(6px);
      z-index: 2;
    }
  }
}

.bottomWrapper {
  display: flex;
  .leftWrapper {
    flex: 1;
    border-right: 1px solid #f0f0f0;
    padding: 20px 10px;
    .hotWrapper {
      .topText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid $primaryColor;
        padding-bottom: 10px;
        .leftText {
          display: flex;
          align-items: flex-end;
          > div {
            &:first-child {
              font-size: 18px;
              margin-right: 20px;
              font-weight: bold;
              > i {
                color: rgb(193, 13, 12);
              }
            }
            &:last-child {
              font-size: 14px;
              > span {
                cursor: pointer;
                transition-property: all;
                transition-duration: 0.3s;
                &:hover {
                  color: rgb(193, 13, 12);
                }
              }
            }
          }
        }

        .rightText {
          font-size: 14px;
          cursor: pointer;
          > span {
            &:last-child {
              color: rgb(193, 13, 12);
              font-weight: bold;
            }
          }
        }
      }
      .bottomWrapper {
        > .el-row {
          margin-top: 10px;
          > .el-col {
            display: flex;
            align-items: center;
            flex-direction: column;
            cursor: pointer;
            &:nth-child(4n) {
              display: flex;
              align-items: flex-end;
              flex-direction: column;
              margin-bottom: 10px;
            }
            &:nth-child(1),
            &:nth-child(5) {
              align-items: flex-start;
            }
          }
        }
        .topImage {
          width: 140px;
          height: 140px;
          overflow: hidden;
          position: relative;
          > img {
            width: 100%;
            height: 100%;
          }
          .count {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 10px;
            padding: 5px 10px;
            color: #fff;
            font-weight: bold;
            .left {
              > span {
                &:first-child {
                  margin-right: 5px;
                }
              }
            }
          }
        }

        .bottomDetail {
          width: 140px;
          > div {
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 140px;
            font-size: 12px;
            color: #a3a3a3;
            &:first-child {
              margin-bottom: 5px;
              margin-top: 5px;
            }
          }
        }
      }
    }

    .news {
      margin-top: 20px;
      .topText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid $primaryColor;
        padding-bottom: 10px;
        .leftText {
          display: flex;
          align-items: flex-end;
          > div {
            &:first-child {
              font-size: 18px;
              margin-right: 20px;
              font-weight: bold;
              > i {
                color: rgb(193, 13, 12);
              }
            }
          }
        }

        .rightText {
          font-size: 14px;
          cursor: pointer;
          > span {
            &:last-child {
              color: rgb(193, 13, 12);
              font-weight: bold;
            }
          }
        }
      }
      .newsBannerWrapper {
        background-color: rgb(245, 245, 245);
        .newsItem {
          display: flex;
          > div {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .imageWrapper {
            width: 100px;
            height: 100px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .detailWrapper {
            margin-top: 5px;
            > div {
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 100px;
              font-size: 12px;
              &:last-child {
                color: #a3a3a3;
                margin-top: 5px;
              }
            }
          }
        }
      }
    }

    .topListWrapper {
      margin-top: 20px;
      .topText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 2px solid $primaryColor;
        padding-bottom: 10px;
        .leftText {
          display: flex;
          align-items: flex-end;
          > div {
            &:first-child {
              font-size: 18px;
              margin-right: 20px;
              font-weight: bold;
              > i {
                color: rgb(193, 13, 12);
              }
            }
          }
        }

        .rightText {
          font-size: 14px;
          cursor: pointer;
          > span {
            &:last-child {
              color: rgb(193, 13, 12);
              font-weight: bold;
            }
          }
        }
      }

      .topListDetail {
        margin: 10px 0;
        display: flex;
        border-top: 1px solid #dedede;
        border-bottom: 1px solid #dedede;
        > div {
          flex: 1;
          padding: 10px;
          box-sizing: border-box;
          &:first-child {
            border-left: 1px solid #dedede;
          }
          border-right: 1px solid #dedede;
        }
        .topItem {
          > div {
            &:first-child {
              display: flex;
              > div {
                &:last-child {
                  flex: 1;
                  font-size: 14px;
                  margin-left: 10px;
                  > div {
                    &:first-child {
                      font-weight: bold;
                      margin-bottom: 10px;
                    }

                    &:last-child {
                      > span {
                        font-size: 20px;
                        margin-right: 5px;
                        color: #a3a3a3;
                        cursor: pointer;
                        transition-property: all;
                        transition-duration: 0.3s;
                        &:hover {
                          color: $primaryColor;
                        }
                      }
                    }
                  }
                }
              }
              .imageWrapper {
                width: 80px;
                height: 80px;
                > img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            &:nth-child(2) {
              font-size: 14px;
              width: 200px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              > div {
                margin-top: 10px;
                transition-property: all;
                transition-duration: 0.3s;
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3) {
                  > span:first-child {
                    color: $primaryColor;
                  }
                }
                &:hover {
                  text-decoration: underline;
                  color: $primaryColor;
                  cursor: pointer;
                }
              }
            }

            &:nth-child(3) {
              margin-top: 10px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: $primaryColor;
              }
            }
          }
        }
      }
    }
  }
  .rightWrapper {
    flex: 0 0 250px;
    box-sizing: border-box;
    .loginWrapper {
      height: 126px;
      background-color: #f9f9f9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 12px;
      > div:first-child {
        padding: 12px;
        line-height: 22px;
      }
      > div:last-child {
        > div {
          width: 100px;
          height: 31px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(255, 255, 255);
          background-position: 0px -195px;
          background-color: red;
          border: none;
          cursor: pointer;
        }
      }
    }

    .singerWrapper {
      padding: 10px;
      .topText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        border-bottom: 1px solid #dedede;
        padding-bottom: 10px;
        > div {
          &:last-child {
            cursor: pointer;
            transition-property: all;
            transition-duration: 0.3s;
            &:hover {
              color: $primaryColor;
            }
          }
        }
      }
      .artistWrapper {
        > div {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 10px;
          background-color: #f9f9f9;
          border: 1px solid #dedede;
          box-sizing: border-box;
          cursor: pointer;
          .imageWrapper {
            width: 62px;
            height: 51px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          > div {
            &:last-child {
              flex: 1;
              margin-left: 10px;
              > div {
                &:first-child {
                  margin-bottom: 5px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }

    .hotSingerWrapper {
      padding: 10px;
      .topText {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        border-bottom: 1px solid #dedede;
        padding-bottom: 10px;
        > div {
          &:last-child {
            cursor: pointer;
            transition-property: all;
            transition-duration: 0.3s;
            &:hover {
              color: $primaryColor;
            }
          }
        }
      }
      .artistWrapper {
        > div {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-top: 10px;
          background-color: #f9f9f9;
          border: 1px solid #dedede;
          box-sizing: border-box;
          cursor: pointer;
          .imageWrapper {
            width: 62px;
            height: 51px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          > div {
            &:last-child {
              flex: 1;
              margin-left: 10px;
              > div {
                &:first-child {
                  margin-bottom: 5px;
                  font-weight: bold;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
