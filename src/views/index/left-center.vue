<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { currentGET } from "@/api";

let colors = ["#248067", "##c4d7d6", "#F48C02", "#ef475d"];
const option = ref({});
const state = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
const getData = () => {
  currentGET("leftCenter").then((res) => {
    console.log(res);
    if (res.success) {
      state.lockNum = res.data.lockNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      state.alarmNum = res.data.alarmNum;
      setOption();
    }
  });
};
getData();
const setOption = () => {
  option.value = {
    title: {
      top: "center",
      left: "center",
      text: [`{value|${state.totalNum}}`, "{name|总数}"].join("\n"),
      textStyle: {
        rich: {
          value: {
            color: "#2b2b2b",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding:[4,0,4,0]
          },
          name: {
            color: "#2b2b2b",
            lineHeight: 20,
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(255, 255, 255, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: [
      {
        name: "肇事车辆",
        type: "pie",
        radius: ["40%", "80%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,.2)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#2f2f35",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#2b2b2b",
              fontSize: 14,
            },
            per: {
              color: "#2b2b2b",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: false,
        },
        tooltip: { show: true },

        labelLine: {
          show: true,
          length: 20, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        data: [
          {
            value: state.onlineNum,
            name: "电动车",
            itemStyle: {
              color: echartsGraphic(["#248067", "#A3FDE0"]),
            },
          },
          {
            value: state.offlineNum,
            name: "货车",
            itemStyle: {
              color: echartsGraphic(["#c4d7d6", "#DBDFDD"]),
            },
          },
          {
            value: state.lockNum,
            name: "小微型客车",
            itemStyle: {
              color: echartsGraphic(["#F48C02", "#FDDB7D"]),
            },
          },
          {
            value: state.alarmNum,
            name: "摩托车",
            itemStyle: {
              color: echartsGraphic(["#ef475d", "#FB6CB7"]),
            },
          },
        ],
      },
    ],
  };
};
</script>

<template>
  <v-chart class="chart" :option="option" />
</template>

<style scoped lang="scss"></style>
