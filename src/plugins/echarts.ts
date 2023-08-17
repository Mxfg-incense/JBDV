// vue-echarts
import ECharts from 'vue-echarts'
import { use } from "echarts/core"
import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    BarChart,PieChart,MapChart,EffectScatterChart,LineChart,GaugeChart, 
  } from 'echarts/charts'
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    DatasetComponent,
    VisualMapComponent,
    GeoComponent,
    MarkPointComponent,
  DataZoomComponent,
  PolarComponent,
    DataZoomComponentOption
  } from 'echarts/components'

  use([
    CanvasRenderer,
    BarChart, PieChart, MapChart, EffectScatterChart, LineChart,GaugeChart,
    PolarComponent,
    GridComponent,
    LegendComponent,
    TooltipComponent,
    TitleComponent,
    DatasetComponent,
    VisualMapComponent,
    GeoComponent,
    MarkPointComponent,
    DataZoomComponent
  ])

  export const registerEcharts= (app:any)=>{
    app.component('v-chart', ECharts)
  }