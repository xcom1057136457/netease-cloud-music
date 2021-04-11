<template>
  <el-dialog
    title="歌词"
    v-model="dialogVisible.show"
    fullscreen
    append-to-body
    @closed="closeHandler"
  >
    <div class="lyric-box">
      <div v-for="(item, index) in lyricList.lines" :key="index">
        {{ item.txt }}
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import Lyric from "lyric-parser";
import { timeFormate } from "@/utils/tools";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: () => {
        return false;
      }
    }
  },
  setup(props, { emit }) {
    const store = useStore();

    let dialogVisible = reactive({
      show: false
    });
    watch(props, val => {
      dialogVisible.show = val.visible;
    });

    watch(
      store.state.song,
      () => {
        setTimeout(() => {
          lyricChangeHandler();
        }, 0);
      },
      { deep: true }
    );

    // 弹框关闭事件
    let closeHandler = () => {
      emit("closeLyric", false);
    };

    // 获取歌词
    let lyricList = ref();
    let lyricChangeHandler = () => {
      if (store.state.song.SongLyric) {
        lyricList.value = new Lyric(store.state.song.SongLyric);
      }
    };

    onMounted(() => {
      // lyricChangeHandler();
    });
    return {
      dialogVisible,
      closeHandler,
      lyricList,
      timeFormate
    };
  }
};
</script>

<style lang="scss" scoped>
.lyric-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 77px;
  > div {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
