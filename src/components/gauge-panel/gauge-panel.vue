<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { currentGET } from "@/api";
import { graphic } from "echarts/core";
import { url } from "inspector";
let option = ref({});

const Props = defineProps<{
  color1: string,
  color2: string,
}>()


const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};

const state = reactive({
  alarmNum: 759,
  offlineNum: 44,
  onlineNum: 654,
  totalNum: 698,
});
const getData = () => {
  currentGET("leftTop").then((res) => {
    console.log(res);
    if (res.success) {
      state.alarmNum = res.data.alarmNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      setOption();
    }
  });
};
getData();
const gaugeData = [
  {
    value: 20,
    detail: {
      valueAnimation: true,
      offsetCenter: ["0%", "-0%"],
    },
  },
];

const setOption = () => {
  option.value = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -270,
        radius: "70%",
        pointer: {
          show: false,
        },
        itemStyle: {
          color: echartsGraphic([Props.color1, Props.color2]),
          shadowColor: Props.color2,
          shadowBlur: 15,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
 
          roundCap: true,

          itemStyle: {
            borderWidth: 1,
            borderColor: Props.color1,
          },
          lineStyle: {
            width: 10,
          },
         
        },
        axisLine: {
          lineStyle: {
            width: 4,
            color: [[1,Props.color1]]
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: true,
          distance: -18,
          lineStyle: {
          color: Props.color1,
          width: 2,
          }
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        detail: {

          valueAnimation: true,
          formatter: function (value: any) {
            return "{value|" + value.toFixed(0) + "}";
          },
          rich: {
            value: {
              fontSize: 25,
              fontWeight: "bolder",
              color: Props.color1,
            },
          },
        },
      },
    ],
  };
};


</script>

<template>
  <v-chart class="chart" :option="option" />
</template>
