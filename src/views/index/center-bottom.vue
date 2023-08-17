<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { currentGET } from "@/api";
import {graphic} from "echarts/core"
const option = ref({});
const getData = () => {
  currentGET("centerBottom", {}).then((res) => {
    console.log("性别组成", res);
    if (res.success) {
      setOption(res.data);
    } else {
      window["$message"]({
        text: res.msg,
        type: "warning",
      });
    }
  });
};
const setOption =async (newData: any) => {
  option.value = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
      formatter: function (params: any) {
        // 添加单位
        var result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.value) {
            if (item.seriesName == "男女比") {
              result +=
                item.marker +
                " " +
                item.seriesName +
                " : " +
                item.value +
                "%</br>";
            } else {
              result +=
                item.marker +
                " " +
                item.seriesName +
                " : " +
                item.value +
                "个</br>";
            }
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      },
    },
    legend: {
      data: ["男性", "女性", "男女比"],
      textStyle: {
        color: "#B4B4B4",
      },
      top: "0",
    },
    grid: {
      left: "50px",
      right: "40px",
      bottom: "30px",
      top: "20px",
    },
    xAxis: {
      data: newData.Date,
      axisLine: {
        lineStyle: {
          color: "#B4B4B4",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },

        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        axisLabel: {
          formatter: "{value}% ",
        },
      },
    ],
    series: [
      {
        name: "男性",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(102,169,201,0.9)" },
            { offset: 0.2, color: "rgba(102,169,201,0.4)" },
            { offset: 1, color: "rgba(102,169,201,0.3)" },
          ]),
        },
    
        data: newData.male,
      },
      {
        name: "女性",
        type: "bar",
        barGap: "-100%",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(156,107,211,0.8)" },
            { offset: 0.2, color: "rgba(156,107,211,0.5)" },
            { offset: 1, color: "rgba(156,107,211,0.2)" },
          ]),
        },
        z: -12,
        data: newData.female,
      },
      {
        name: "男女比",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          color: "#e77c8e",
        },
        data: newData.rateData,
      },
    ],
  };
};
onMounted(()=>{
getData();

})
</script>

<template>
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option)!='{}'"/>
</template>

<style scoped lang="scss"></style>
