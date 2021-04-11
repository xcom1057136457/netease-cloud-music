<template>
  <div class="wrapper">
    <div class="leftWrapper">
      <div class="topText">云音乐特色榜</div>
      <div class="detailWrapper">
        <div
          v-for="(item, index) in topList1"
          :key="index"
          :class="currentIndex == index ? 'current' : ''"
          @click="changeType(item, index)"
        >
          <div class="imageWrapper">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.updateFrequency }}</div>
          </div>
        </div>
      </div>

      <div class="topText" style="margin-top: 10px">全球媒体榜</div>
      <div class="detailWrapper">
        <div
          v-for="(item, index) in topList2"
          :key="index"
          :class="currentIndex == index + 4 ? 'current' : ''"
          @click="changeType2(item, index)"
        >
          <div class="imageWrapper">
            <img :src="item.coverImgUrl" alt="" />
          </div>
          <div>
            <div>{{ item.name }}</div>
            <div>{{ item.updateFrequency }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="rightWrapper" v-loading="state.loading">
      <rightMusic
        :detailList="detailList"
        ref="rightMusicWrapper"
        @toggleLoading="toggleLoading"
      ></rightMusic>
    </div>
  </div>
</template>

<script>
import { getToplist } from "@/http/api.js";
import { onMounted, reactive, ref } from "vue";
import rightMusic from "./components/rightMusic";
import { useRoute } from "vue-router";
export default {
  components: {
    rightMusic
  },
  setup() {
    let rightMusicWrapper = ref(null);
    const route = useRoute();
    // 获取榜单
    let topList1 = ref([]);
    let topList2 = ref([]);
    let detailList = ref({});
    let getTopListHandler = async () => {
      let { code, list } = await getToplist();
      if (code == 200) {
        for (let i = 0; i < 4; i++) {
          topList1.value[i] = list[i];
        }

        for (let i = 4; i < list.length; i++) {
          topList2.value.push(list[i]);
        }

        if (route.params.type) {
          detailList.value = topList1.value[route.params.type];
        } else {
          detailList.value = topList1.value[0];
        }
        setTimeout(() => {
          rightMusicWrapper.value.getSongListHandler();
        }, 0);
      }
    };

    // 控制当前所选项
    let currentIndex = ref(0);
    currentIndex.value = route.params.type ? route.params.type : 0;
    let changeType = (item, index) => {
      currentIndex.value = index;
      detailList.value = item;
    };
    let changeType2 = (item, index) => {
      currentIndex.value = index + 4;
      detailList.value = item;
    };

    // loading控制
    let state = reactive({
      loading: true
    });
    let toggleLoading = val => {
      state.loading = val;
    };

    onMounted(() => {
      getTopListHandler();
    });

    return {
      topList1,
      topList2,
      currentIndex,
      changeType,
      changeType2,
      detailList,
      rightMusicWrapper,
      state,
      toggleLoading
    };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  > div {
    &:first-child {
      flex: 0 0 240px;
      border-right: 1px solid #dedede;
      padding: 10px 0;
      box-sizing: border-box;
    }

    &:last-child {
      flex: 0 0 740px;
      overflow: hidden;
    }
  }
}

.leftWrapper {
  .topText {
    font-size: 16px;
    font-weight: bold;
    padding: 0 10px;
  }
  .detailWrapper {
    > div {
      margin-top: 5px;
      padding: 5px 10px;
      display: flex;
      cursor: pointer;
      transition-property: all;
      transition-duration: 0.3s;
      > div {
        &:first-child {
          flex: 0 0 44px;
          height: 44px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        &:last-child {
          flex: 1;
          font-size: 14px;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          > div {
            &:last-child {
              font-size: 12px;
              color: #a3a3a3;
            }
          }
        }
      }
      &:hover {
        background-color: rgb(230, 230, 230);
      }
    }
  }
}

.rightWrapper {
  padding: 10px;
  box-sizing: border-box;
}

.current {
  background-color: rgb(230, 230, 230);
}
</style>
