
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
// import echarts from 'echarts';

export default class Lunar extends PureComponent {
  getOption = () => {
    var dataAxis = ['北京', '上海', '南京', '子', '或', '者', '两', '指'];
    var data = [
      220,
      182,
      191,
      234,
      290,
      330,
      310,
      123,
      442,
      321,
      90,
      149,
      210,
      122,
      133,
      334,
      198,
      123,
      125,
      220,
    ];
    var yMax = 500;
    var dataShadow = [];

    for (var i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    return {
      xAxis: {
        data: dataAxis,
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },
        },
      },
      yAxis: {
        // data: dataAxis,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          type: 'line',
          data: data,
        },
      ],
    };
  };

  render() {
    //   const {} = this.props
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ height: '100%', width: '100%' }}
        className="react_for_echarts"
      />
    );
  }
}
