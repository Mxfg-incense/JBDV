<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { currentGET, GETNOBASE } from "@/api";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import BorderBox13 from "@/components/datav/border-box-13";
import selector from "@/components/selector";
import type { MapdataType } from "./center.map";
import { valid } from "mockjs";
const option = ref({});
const code = ref<string>("310000"); //china 代表中国 其他地市是行政编码
const type = ref('option1');

withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图",
  }
);

const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] =
      element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value),
      });
    }
  });
  await nextTick();

  option.value = optionHandle(regionCode, list, mapData);
};

const getData = async (regionCode: string, type: any) => {
  currentGET("centerMap", { regionCode: regionCode,type:type }).then((res) => {
    console.log("各省分布", res);
    if (res.success) {
      dataSetHandle(res.data.regionCode, res.data.dataList);
    }
  });
  code.value = regionCode;
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then(
        (data) => data
      );
      code.value = regionCode;
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};
getData(code.value,type.value);

const mapClick = (params: any) => {
  console.log(params);
  let xzqData = regionCodes[params.name];
  if (xzqData) {
    getData(xzqData.adcode,type.value);
  } else {
    window["$message"].warning("暂无下级地市");
  }
};

const setType = (value:any) => {
  console.log(value);
  type.value = value;
  getData(code.value,type.value);
};

</script>

<template>
  <div class="centermap">
    <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ title }}</span>
      <div class="you"></div>
    </div>
    <div class="mapwrap">
      <BorderBox13>
        
        <selector @changeOption="setType"  />
        <div class="quanguo" @click="getData('china',type)" v-if="code !== 'china'">
          上一级
        </div>
        <v-chart
          class="chart"
          :option="option"
          ref="centerMapRef"
          @click="mapClick"
          v-if="JSON.stringify(option) != '{}'"
        />
      </BorderBox13>
    </div>
  </div>
</template>

<style scoped lang="scss">
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;


.quanguo {
      position: absolute;
      right: 20px;
        top: 25px;
      width: 80px;
      height: 28px;
      border: 1px solid #ffffff;
      border-radius: 10px;
      color: #1a1a1a;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      z-index: 10;
      background-color: #ffefc0;
    }
  }
}
</style>
