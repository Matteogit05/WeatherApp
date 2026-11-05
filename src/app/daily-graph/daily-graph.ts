import { Component, computed, inject, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart, LineChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, LineChart, GridComponent, CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent]);
import { EChartsCoreOption } from 'echarts/core';
import { Title } from '@angular/platform-browser';
import { WeatherResponse } from '../models/weather-model';
import { WeatherService } from '../services/weather-service';

@Component({
  imports: [NgxEchartsDirective],
  selector: 'app-daily-graph',
  styleUrl: './daily-graph.css',
  templateUrl: './daily-graph.html',
  providers: [provideEchartsCore({ echarts })]
})
export class DailyGraph {
  weatherData = input<WeatherResponse>()
  index = input<number>(0)
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
        data: hour?.time.slice(this.index() * 24, (this.index() * 24) + 24)
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          offset: 45,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
        {
          type: 'value',
          position: 'left',
          axisLabel: {
            formatter: '{value} %'
          },
          min: 0,
          max: 100
        },
        {
          type: 'value',
          position: 'right',
          axisLabel: {
            formatter: '{value} mm'
          },
          min: 0,
          max: (value: {min: number, max: number}) => {
            return Math.max(value.max, 5)
          }
        }
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          smooth: true,
          data: hour?.temperature_2m.slice(this.index() * 24, (this.index() * 24) + 24),
          yAxisIndex: 0
        },
        {
          name: 'Precipitation Probability',
          type: 'line',
          smooth: true,
          data: hour?.precipitation_probability.slice(this.index() * 24, (this.index() * 24) + 24),
          yAxisIndex: 1
        },
        {
          name: 'Cloud Cover',
          type: 'line',
          smooth: true,
          data: hour?.cloud_cover.slice(this.index() * 24, (this.index() * 24) + 24),
          yAxisIndex: 1
        },
        {
          name: 'Rain',
          type: 'line',
          smooth: true,
          data: hour?.rain.slice(this.index() * 24, (this.index() * 24) + 24),
          yAxisIndex: 2
        },
      ]
    }
  })
}