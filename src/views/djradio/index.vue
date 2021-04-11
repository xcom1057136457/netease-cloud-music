<template>
  <div class="djBox">
    <div class="top-box">
      <div v-for="(item, index) in djCatList" :key="index">
        <div
          class="image-box"
          :style="{ backgroundImage: `url(${item.picWebUrl})` }"
        ></div>
        <div class="bottom-box">{{ item.name }}</div>
      </div>
    </div>

    <div class="bottom-box"></div>
  </div>
</template>

<script>
import { djCatelist, programRecommend } from "@/http/api";
import { onMounted, ref } from "vue";
export default {
  setup() {
    // 获取电台分类
    let djCatList = ref([]);
    let djCatelistHandler = async () => {
      let { code, categories } = await djCatelist();
      if (code == 200) {
        djCatList.value = categories;
      }
    };

    // 获取推荐节目
    let programRecommendHandler = async () => {
      let { code } = await programRecommend();
      if (code == 200) {
        console.log();
      }
    };

    onMounted(() => {
      djCatelistHandler();
      programRecommendHandler();
    });

    return {
      djCatList
    };
  }
};
</script>

<style lang="scss" scoped>
.djBox {
  padding: 20px 0;
  .top-box {
    display: flex;
    flex-wrap: wrap;
    > div {
      flex: 0 0 70px;
      height: 70px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      margin: 0 0 25px 33px;
      &:hover {
        background-color: #f9f9f9;
      }
      .image-box {
        width: 48px;
        height: 48px;
        background-position: 0 0;
      }
      .bottom-box {
        font-size: 12px;
      }
    }
  }
}
</style>
