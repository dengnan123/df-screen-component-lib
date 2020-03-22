import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-gl';

export default class Api extends PureComponent {
  getOption = () => ({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      },
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  });

  render() {
    return <ReactEcharts option={this.getOption()} style={{ height: '100%', width: '100%' }} />;
  }
}
