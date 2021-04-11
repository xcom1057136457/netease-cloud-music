import { getSongURL, checkMusic, lyric } from "@/http/api";
import { ElNotification } from "element-plus";

export default {
  namespaced: true,
  state: {
    // 歌曲URL
    songURL: {},
    // 歌曲信息
    SongInfo: {},
    // 歌词
    SongLyric: {}
  },
  getters: {},
  mutations: {
    // 设置歌曲URL
    SetSongURL(state, data) {
      state.songURL = data;
    },
    // 设置歌曲Info
    SetSongInfo(state, data) {
      state.SongInfo = data;
    },
    // 设置歌曲歌词
    SetSongLyric(state, data) {
      state.SongLyric = data;
    }
  },
  actions: {
    // 获取歌曲信息
    GetSongURL({ commit }, params) {
      commit("SetSongURL", params);
    },

    // 根据歌曲id获取歌曲信息
    async GetUrlById({ dispatch, state }, params) {
      let songParams = {
        id: params
      };
      let { success, message } = await checkMusic(songParams);
      if (success) {
        let { code, data } = await getSongURL(songParams);
        if (code == 200) {
          dispatch("GetSongURL", data[0]);
          dispatch("GetSongLyric", songParams);
          ElNotification.success({
            title: `${state.SongInfo.name}`,
            message: `歌曲开始播放`
          });
        }
      } else {
        ElNotification.error({
          title: "失败提示",
          message
        });
      }
    },

    // 获取歌曲Info
    GetSongInfo({ commit }, params) {
      commit("SetSongInfo", params);
    },

    // 获取歌词
    async GetSongLyric({ commit }, params) {
      let { code, lrc } = await lyric(params);
      if (code == 200) {
        commit("SetSongLyric", lrc.lyric);
      } else {
        ElNotification.error({
          title: "失败提示",
          message: "暂时没有歌词!"
        });
      }
    }
  }
};
