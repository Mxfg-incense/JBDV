<script setup lang="ts">
import { ref, onMounted } from "vue";
import { currentGET } from "@/api";
import { graphic, format } from "echarts/core";
import { UniversalTransition } from 'echarts/features';
const option = ref({});
const getData = () => {
  currentGET("rightTop", {}).then((res) => {
    console.log("增长趋势 ", res);
    if (res.success) {
      setOption(res.data.Date, res.data.data1, res.data.data2);
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
const setOption = async (Date: any[], yData: any[], yData2: any[]) => {
  option.value = {
    tooltip: {
    position: function (pt:any) {
      return [pt[0], 130];
    }
  },
    xAxis: {
      type: 'category',
      data: Date,
      boundaryGap: false, // 不留白，从原点开始
      axisLine: {
        // show:false,
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisPointer: {
        value: "category",
        snap: true,
        lineStyle: {
          color: "#7581BD",
          width: 3,
        },
        label: {
          show: true,
          formatter: function (params: any) {
            return format.formatTime("yyyy", params.value);
          },
          backgroundColor: "#7581BD",
        },
        handle: {
          show: true,
          color: "#7581BD",
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        inside: false,
        color: "#7EB7FD",
        fontWeight: "500",
      },
      
    },
    grid: {
      //布局
      show: true,
      left: "10px",
      right: "30px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    dataZoom: [
      {
        type: "inside",
        throttle: 50,
      },
    ],

    series: [
      {
        data: yData,
        type: "line",
        smooth: true,
        //symbol: "none", //去除点
        name: "危险驾驶",
        color: "rgba(252,144,16,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(252,144,16,.7)",
              },
              {
                offset: 1,
                color: "rgba(252,144,16,.0)",
              },
            ],
            false
          ),
        },
      },
      {
        data: yData2,
        type: "line",
        smooth: true,
        //symbol: "none", //去除点
        name: "信息诈骗",
        color: "rgba(9,202,243,.7)",
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(9,202,243,.7)",
              },
              {
                offset: 1,
                color: "rgba(9,202,243,.0)",
              },
            ],
            false
          ),
        },
      },
    ],
  };
};
onMounted(() => {
  getData();
});
</script>

<template>
  <v-chart
    class="chart"
    :option="option"
    v-if="JSON.stringify(option) != '{}'"
  />
</template>

<style scoped lang="scss"></style>
