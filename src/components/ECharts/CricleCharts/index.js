import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default class CircleCharts extends Component {
  static propTypes = {
    remainingColor: PropTypes.string,
    perceColor: PropTypes.string,
    perceNumber: PropTypes.number
  }

  render() {
    const { remainingColor, perceColor, perceNumber } = this.props
    return (
      <div>
        <ReactEchartsCore
          echarts={echarts}
          option={{
            color: [remainingColor, perceColor],
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              x: 'left',
              data: ['直接访问', '邮件营销']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['70%', '90%'],
                avoidLabelOverlap: false,
                hoverAnimation: false,
                hoverLayerThreshold: false,
                grid: {
                  width: '80px',
                  height: '80px'
                },
                label: {
                  normal: {
                    show: true,
                    position: 'center'
                  },
                  emphasis: {
                    show: false,
                    textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                },
                data: [
                  { value: perceNumber ? perceNumber : 0, name: `${perceNumber ? perceNumber : 0}%` },
                  { value: 100, name: '' }
                ]
              }
            ]
          }}
          style={{ width: 90, height: 90 }}
        />
      </div>
    )
  }
}
