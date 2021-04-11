<template>
  <div class="songBarWrapper">
    <div class="playWrapper">
      <div class="song-info" @click="openLyric">
        <div class="imageWrapper">
          <el-image
            style="width: 50px; height: 50px"
            :src="
              songInfo.al
                ? songInfo.al.picUrl
                : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            "
            fit="cover"
          ></el-image>
        </div>
        <div class="artist">
          <div>{{ songInfo.ar ? songInfo.ar[0].name : "歌手名" }}</div>
          <div>{{ songInfo.name ? songInfo.name : "歌曲名" }}</div>
        </div>
      </div>
      <div class="audioWrapper">
        <audio :src="songURL.url" controls id="audioPlay"></audio>
      </div>
      <div class="user-operate">
        <span class="el-icon-download"></span>
        <span class="el-icon-refresh-left" @click="refreshHandler"></span>
      </div>
    </div>
  </div>

  <lyricDialog
    :visible="lyricSate.show"
    @closeLyric="closeLyricHandler"
  ></lyricDialog>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import lyricDialog from "../lyricDialog/index";
export default {
  components: {
    lyricDialog
  },
  setup() {
    let audioPlay;

    // 获取歌曲信息
    const store = useStore();
    let songInfo = ref(store.state.song.SongInfo);
    let songURL = ref(store.state.song.songURL);
    watch(
      store.state.song,
      val => {
        songInfo.value = val.SongInfo;
        songURL.value = val.songURL;
        setTimeout(() => {
          audioPlay.play();
        }, 0);
      },
      {
        deep: true
      }
    );

    // 获取audio元素
    let getAudioDom = () => {
      audioPlay = document.getElementById("audioPlay");
    };

    // 重放
    let refreshHandler = () => {
      audioPlay.load();
      setTimeout(() => {
        audioPlay.play();
      }, 0);
    };

    // 打开弹框
    let lyricSate = reactive({
      show: false
    });
    let openLyric = () => {
      lyricSate.show = !lyricSate.show;
    };

    // 关闭弹窗
    let closeLyricHandler = val => {
      lyricSate.show = val;
    };

    onMounted(() => {
      getAudioDom();
    });

    return {
      songInfo,
      songURL,
      audioPlay,
      refreshHandler,
      openLyric,
      lyricSate,
      closeLyricHandler
    };
  }
};
</script>

<style lang="scss" scoped>
.songBarWrapper {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 99999;
  .playWrapper {
    width: 980px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .song-info {
      display: flex;
      margin-right: 20px;
      cursor: pointer;
      .imageWrapper {
        margin-right: 10px;
      }
      .artist {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        > div {
          &:nth-child(1) {
            font-size: 16px;
            font-weight: bold;
          }
        }
      }
    }
    .audioWrapper {
      flex: 1;
      > audio {
        width: 100%;
      }
    }
    .user-operate {
      margin-left: 20px;
      > span {
        margin-right: 10px;
        font-size: 20px;
        cursor: pointer;
        font-size: 25px;
        transition-property: all;
        transition-duration: 0.3s;
        &:hover {
          color: rgb(194, 12, 12);
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
