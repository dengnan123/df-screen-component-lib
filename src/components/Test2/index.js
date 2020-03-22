// import React, { useState } from 'react';
// import styles from './index.less';
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';


export default class Lunar extends PureComponent {
  getOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        // orient: 'vertical',
        // left: 10,
        // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' },
          ],
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
