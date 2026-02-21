<script lang="ts" setup>
import instance from "@/axios";
import { TaskQueue } from "@/utils/task";
import { onMounted, ref, reactive } from "vue";
import myImage1 from "@/assets/images/1.jpg";
import myImage2 from "@/assets/images/2.jpg";
import myImage3 from "@/assets/images/3.jpg";
import myImage4 from "@/assets/images/4.png";
import myImage5 from "@/assets/images/5.jpg";
import myImage6 from "@/assets/images/6.jpg";
import myImage7 from "@/assets/images/7.jpg";
import myImage8 from "@/assets/images/8.png";
import myImage9 from "@/assets/images/9.jpg";
import { useLink } from "vue-router";

const navRef = ref(null);
const imgOptions = reactive({
  gap: 5,
  imgWidth: 0,
  nums: 3,
  containerHeight: [],
});
const classificationList = reactive([
  {
    name: "分类1",
    id: "1",
  },
  {
    name: "分类2",
    id: "2",
  },
]);
const classificationId = reactive(["1", "2"]);
const values = reactive([
  {
    imageUrl: myImage1,
    name: "1",
    id: "1",
    index: 0,
  },
  {
    imageUrl: myImage2,
    name: "2",
    id: "2",
    index: 1,
  },
  {
    imageUrl: myImage3,
    name: "3",
    id: "3",
    index: 2,
  },
  {
    imageUrl: myImage4,
    name: "4",
    id: "4",
    index: 3,
  },
  {
    imageUrl: myImage5,
    name: "5",
    id: "5",
    index: 4,
  },
  {
    imageUrl: myImage6,
    name: "6",
    id: "6",
    index: 5,
  },
  {
    imageUrl: myImage7,
    name: "7",
    id: "7",
    index: 6,
  },
  {
    imageUrl: myImage8,
    name: "8",
    id: "8",
    index: 7,
  },
  {
    imageUrl: myImage9,
    name: "9",
    id: "9",
    index: 8,
  },
]);

onMounted(() => {
  if (navRef.value) {
    const navWidth = navRef.value.getBoundingClientRect().width;
    console.log(navWidth, "navWidth");
    imgOptions.imgWidth = Math.floor(
      (navWidth - 2 * imgOptions.gap * (imgOptions.nums - 1)) / 3,
    );
    imgOptions.containerHeight = Array(imgOptions.nums).fill(0);
  }
});

function handleLoad(e, item) {
  const el = e.target;

  const width = el.offsetWidth;
  const height = el.offsetHeight;
  // 找最短列
  const minIndex = imgOptions.containerHeight.indexOf(
    Math.min(...imgOptions.containerHeight),
  );

  el.style.left = minIndex * (width + imgOptions.gap) + "px";
  el.style.top = imgOptions.containerHeight[minIndex] + imgOptions.gap + "px";

  imgOptions.containerHeight[minIndex] += height + imgOptions.gap;
}
</script>

<template>
  <div class="classification">
    <div class="classification-name">分类:</div>
    <div class="classification-tab scroll-clear">
      <div
        v-for="item in classificationList"
        :key="item.id"
        :class="`classification-tab-list ${classificationId.includes(item.id) ? 'classification-tab-list-a' : ''}`"
      >
        {{ item.name }}
      </div>
      <div class="classification-tab-list" style="min-width: 30px">+</div>
      <div style="width: 70px; height: 100%; flex-shrink: 0"></div>
    </div>
    <div
      class="classification-clear"
      :style="{ color: classificationId.length === 0 ? '#ccc' : '#000' }"
      @click="
        classificationId.length > 0
          ? classificationId.splice(0, classificationId.length)
          : null
      "
    >
      清除
    </div>
  </div>
  <div class="nav-img scroll-clear">
    <div class="nav" id="sortableId" ref="navRef">
      <img
        v-for="item in values"
        :key="item.id"
        @load="handleLoad($event, item)"
        class="img"
        :src="item.imageUrl"
        :alt="item.name"
        :style="{ maxWidth: imgOptions.imgWidth + 'px' }"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.scroll-clear {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    display: none; /* WebKit */
  }
}

.classification {
  width: 100%;
  height: 50px;
  position: relative;
  border-bottom: 1px dashed #000;

  .classification-name {
    float: left;
    width: 60px;
    height: 100%;
    line-height: 50px;
    text-align: center;
  }

  .classification-tab {
    width: calc(100% - 60px);
    height: 100%;
    align-items: center;
    overflow-x: auto;
    display: flex;

    .classification-tab-list {
      flex-shrink: 0;
      min-width: 50px;
      height: 30px;
      background-color: #fff;
      margin-right: 10px;
      line-height: 30px;
      text-align: center;
      color: #000;
      cursor: pointer;
      border: 1px solid #000;
      border-radius: 10px;
      padding: 0 5px;
    }

    .classification-tab-list-a {
      color: #0000ee;
      border-color: #0000ee;
    }
  }

  .classification-clear {
    width: 70px;
    position: absolute;
    right: 0;
    background-color: #fff;
    top: 0;
    height: 100%;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
}

// .header-submit {
//   cursor: pointer;
//   border: 1px solid #000;
//   text-align: center;
//   width: 100px;
//   box-sizing: border-box;
// }
// .header-upload {
//   cursor: pointer;
//   border: 1px solid #000;
//   text-align: center;
//   width: 100px;
//   box-sizing: border-box;
// }

.nav-img {
  width: 100%;
  height: calc(100vh - 115px);
  overflow: auto;
  .nav {
    width: 95%;
    height: 100vh;
    margin: 0 auto;
    position: relative;
    .img {
      border-radius: 10px;
      position: absolute;
      translate: 1s all;
    }
  }
}
</style>
