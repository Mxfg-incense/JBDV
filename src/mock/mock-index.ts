import Mock from "mockjs";
import chinaData from "@/assets/Data/china.json";
import cityData from "@/assets/Data/city.json";
import genderData from "@/assets/Data/gender.json";
import totalData from "@/assets/Data/total.json";

//处理路径传参
import { parameteUrl } from "@/utils/query-param";
import { mock } from "node:test";

function ArrSet(Arr: any[], id: string): any[] {
  let obj: any = {};
  const arrays = Arr.reduce((setArr, item) => {
    obj[item[id]] ? "" : (obj[item[id]] = true && setArr.push(item));
    return setArr;
  }, []);
  return arrays;
}
/**
 * @description: min ≤ r ≤ max  随机数
 * @param {*} Min
 * @param {*} Max
 * @return {*}
 */
function RandomNumBoth(Min: any, Max: any) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
//左中
export default [
  {
    url: "/bigscreen/countUserNum",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          offlineNum: "@integer(50, 100)",
          alarmNum: "@integer(20, 100)",
          lockNum: "@integer(10, 50)",
          totalNum: 368,
        },
      });
      a.data.onlineNum =
        a.data.totalNum - a.data.offlineNum - a.data.lockNum - a.data.alarmNum;
      return a;
    },
  },
  {
    url: "/bigscreen/countDeviceNum",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          alarmNum: "@integer(100, 1000)",
          offlineNum: "@integer(0, 50)",
          totalNum: 698,
        },
      });
      a.data.onlineNum = a.data.totalNum - a.data.offlineNum;
      return a;
    },
  },
  //左下
  {
    url: "/bigscreen/leftBottom",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          "list|20": [
            {
              provinceName: "@province()",
              cityName: "@city()",
              countyName: "@county()",
              createTime: "@datetime('yyyy-MM-dd HH:mm:ss')",
              deviceId: "6c512d754bbcd6d7cd86abce0e0cac58",
              "gatewayno|+1": 10000,
              "onlineState|1": [0, 1],
            },
          ],
        },
      });
      return a;
    },
  },
  //右上
  {
    url: "/bigscreen/alarmNum",
    type: "get",
    response: () => {
      return {
        success: true,
        data: totalData,
      };
    },
  },
  //右中
  {
    url: "/bigscreen/ranking",
    type: "get",
    response: () => {
      let num = cityData;
      //   console.log("ranking",num);
      let newNum: any = [],
        numObj: any = {};
      num.map((item: any) => {
        if (!numObj[item.name] && newNum.length < 8) {
          numObj[item.name] = true;
          newNum.push(item);
        }
      });
      let arr = newNum.sort((a: any, b: any) => {
        return b.value - a.value;
      });
      let a = {
        success: true,
        data: arr,
      };
      return a;
    },
  },
  //右下
  {
    url: "/bigscreen/rightBottom",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          "list|40": [
            {
              alertdetail: "@csentence(5,10)",
              "alertname|1": ["水浸告警", "各种报警"],
              alertvalue: "@float(60, 200)",
              createtime: "2022-04-19 08:38:33",
              deviceid: null,
              "gatewayno|+1": 10000,
              phase: "A1",
              sbInfo: "@csentence(10,18)",
              "terminalno|+1": 100,
              provinceName: "@province()",
              cityName: "@city()",
              countyName: "@county()",
            },
          ],
        },
      });
      return a;
    },
  },
  //安装计划
  {
    url: "/bigscreen/installationPlan",
    type: "get",
    response: () => {
      return {
        success: true,
        data: genderData,
      };
    },
  },
  {
    // 各省分布图

    url: "/bigscreen/centerMap",
    type: "get",
    response: (options: any) => {
      let params = parameteUrl(options.url);
      //不是中国的时候
      if (params.regionCode && !["china"].includes(params.regionCode)) {
        const a = Mock.mock({
          success: true,
          data: {
            dataList: cityData,
            regionCode: params.regionCode, //-代表中国
          },
        });
        return a;
      } else {
        const Data = {
          success: true,
          data: {
            dataList: chinaData,
            regionCode: "china", //-代表中国
          },
        };

        //  console.log("mockData",mockData);
        return Data;
      }
    },
  },
];
