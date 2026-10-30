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