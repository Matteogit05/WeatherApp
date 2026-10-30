import { Component, computed, inject, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, LineChart, GridComponent, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);
import { EChartsCoreOption } from 'echarts/core';
import { Title } from '@angular/platform-browser';
import { WeatherResponseDaily } from '../weather-model';
import { WeatherService } from '../weather-service';

@Component({
  imports: [NgxEchartsDirective],
  selector: 'app-daily-graph',
  styleUrl: './daily-graph.css',
  templateUrl: './daily-graph.html',
  providers: [provideEchartsCore({ echarts })]
})
export class DailyGraph {
  weatherData = input<WeatherResponseDaily>()
  weatherService = inject(WeatherService)

  chartOption = computed<EChartsCoreOption>(() => {
    const hour = this.weatherData()?.hourly
    return {
      legend: {
        data: ['Temperature', 'Precipitation Probability', 'Cloud Cover', 'Rain']
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          offset: 110,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        {
          type: 'value',
          position: 'left',
          offset: 60,
          axisLabel: {
            formatter: '{value} %'
          }
        },
        {
          type: 'value',
          position: 'left',
          axisLabel: {
            formatter: '{value} mm'
          }
        }
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          smooth: true,
          data: hour?.temperature_2m ?? [],
          yAxisIndex: 0
        },
        {
          name: 'Precipitation Probability',
          type: 'line',
          smooth: true,
          data: hour?.precipitation_probability ?? [],
          yAxisIndex: 1
        },
        {
          name: 'Cloud Cover',
          type: 'line',
          smooth: true,
          data: hour?.cloud_cover ?? [],
          yAxisIndex: 1
        },
        {
          name: 'Rain',
          type: 'line',
          smooth: true,
          data: hour?.rain ?? [],
          yAxisIndex: 2
        },
      ]
    }
  })
}

/*
option = {
  title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};


*/