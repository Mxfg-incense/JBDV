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
      setOption(res.data.data1, res.data.data2);
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
const setOption = async (yData: any[], yData2: any[]) => {
  option.value = {
    tooltip: {
    position: function (pt:any) {
      return [pt[0], 130];
    }
  },
    xAxis: {
      type: "time",
      boundaryGap: false, // 不留白，从原点开始
      axisLine: {
        // show:false,
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisPointer: {
        value: "2021-11-03",
        snap: true,
        lineStyle: {
          color: "#7581BD",
          width: 3,
        },
        label: {
          show: true,
          formatter: function (params: any) {
            return format.formatTime("yyyy-MM-dd", params.value);
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
    toolbox: {
        left: "center",
        itemSize: 25,
        top: 55,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          restore: {},
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
        // markPoint: {
        //   data: [
        //     {
        //       name: "最大值",
        //       type: "max",
        //       valueDim: "y",
        //       symbol: "rect",
        //       symbolSize: [60, 26],
        //       symbolOffset: [0, -20],
        //       itemStyle: {
        //         color: "rgba(0,0,0,0)",
        //       },
        //       label: {
        //         color: "#FC9010",
        //         backgroundColor: "rgba(252,144,16,0.1)",
        //         borderRadius: 6,
        //         padding: [7, 14],
        //         borderWidth: 0.5,
        //         borderColor: "rgba(252,144,16,.5)",
        //         formatter: "危险驾驶：{c}",
        //       },
        //     },
        //     {
        //       name: "最大值",
        //       type: "max",
        //       valueDim: "y",
        //       symbol: "circle",
        //       symbolSize: 6,
        //       itemStyle: {
        //         color: "#FC9010",
        //         shadowColor: "#FC9010",
        //         shadowBlur: 8,
        //       },
        //       label: {
        //         formatter: "",
        //       },
        //     },
        //   ],
        // },
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
        // markPoint: {
        //   data: [
        //     {
        //       name: "最大值",
        //       type: "max",
        //       valueDim: "y",
        //       symbol: "rect",
        //       symbolSize: [60, 26],
        //       symbolOffset: [0, -20],
        //       itemStyle: {
        //         color: "rgba(0,0,0,0)",
        //       },
        //       label: {
        //         color: "#09CAF3",
        //         backgroundColor: "rgba(9,202,243,0.1)",

        //         borderRadius: 6,
        //         borderColor: "rgba(9,202,243,.5)",
        //         padding: [7, 14],
        //         formatter: "信息诈骗：{c}",
        //         borderWidth: 0.5,
        //       },
        //     },
        //     {
        //       name: "最大值",
        //       type: "max",
        //       valueDim: "y",
        //       symbol: "circle",
        //       symbolSize: 6,
        //       itemStyle: {
        //         color: "#09CAF3",
        //         shadowColor: "#09CAF3",
        //         shadowBlur: 8,
        //       },
        //       label: {
        //         formatter: "",
        //       },
        //     },
        //   ],
        // },
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
