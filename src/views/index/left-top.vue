<script setup lang="ts">
import { reactive, ref } from "vue";
import { currentGET } from "@/api";
import CountUp from "@/components/count-up";
import GaugePanel from "@/components/gauge-panel";
import { SetOperationEnum } from "element-plus/es/components/tree-v2/src/virtual-tree";
const duration = ref(2);
const state = reactive({
  alarmNum: 759,
  offlineNum: 44,
  onlineNum: 654,
  totalNum: 698,
});
const colors1 = ref(["#55bb8a", "#F48C02", "#f5023d"]);
const colors2 = ref(["#c6dfc8", "#f8df72", "#eea08c"])
const getData = () => {
  currentGET("leftTop").then((res) => {
    console.log(res);
    if (res.success) {
      state.alarmNum = res.data.alarmNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
    }
  });
};
getData();
</script>

<template>
  <ul class="user_Overview flex">
    <li class="user_Overview-item" style="color: #55bb8a">
      <div class="user_Overview_nums">
        <GaugePanel :color1= colors1[0] :color2=colors2[0] />
      </div>
      <p>免刑</p>
    </li>
    <li class="user_Overview-item" style="color: #F48C02">
      <div class="user_Overview_nums">
        <GaugePanel :color1=colors1[1] :color2=colors2[1] />
      </div>
      <p>拘役</p>
    </li>
    <li class="user_Overview-item" style="color: #f5023d">
      <div class="user_Overview_nums">
        <GaugePanel :color1=colors1[2] :color2=colors2[2] />
      </div>
      <p>有期徒刑</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.left-top {
  width: 100%;
  height: 100%;
}

.user_Overview {
  li {
    flex: 1;

    p {
      text-align: center;
      height: 16px;
      font-size: 16px;
    }

    .user_Overview_nums {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      margin: 50px auto 30px;
      background-size: cover;
      background-position: center center;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &.bgdonghua::before {
        animation: rotating 14s linear infinite;
      }
    }

    .allnum {
      &::before {
        background-image: url("@/assets/img/left_top_lan.png");
      }
    }

    .online {
      &::before {
        background-image: url("@/assets/img/left_top_lv.png");
      }
    }

    .offline {
      &::before {
        background-image: url("@/assets/img/left_top_huang.png");
      }
    }

    .laramnum {
      &::before {
        background-image: url("@/assets/img/left_top_hong.png");
      }
    }
  }
}
</style>
