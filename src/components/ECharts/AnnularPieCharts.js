import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import styles from './index.less'

const PRIMARY_COLORS = ['#6857ef', '#1786e8', '#e84018', '#fecf04']

class AnnularPieCharts extends Component {
  static propTypes = {
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        data: PropTypes.array
      })
    ),
    title: PropTypes.shape({
      text: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    }),
    initRadius: PropTypes.number,
    barWidth: PropTypes.number,
    barGap: PropTypes.number,
    legendFormatter: PropTypes.func,
    legendData: PropTypes.arrayOf(PropTypes.string),
    reference: PropTypes.any,
    invisibleColor: PropTypes.any
  }

  render() {
    const {
      series,
      title,
      legendData,
      barWidth,
      barGap,
      initRadius,
      legendFormatter,
      reference,
      invisibleColor
    } = this.props
    const invisibleItem = {
      name: 'invisible',
      hoverAnimation: false,
      cursor: 'default',
      itemStyle: {
        color: invisibleColor
      },
      emphasis: {
        itemStyle: {
          color: invisibleColor
        }
      }
    }
    const finalSeries = getFinalSeries(series, barGap, barWidth, initRadius, invisibleItem)
    const titleObj = title
      ? {
          text: title.text,
          x: 'center',
          y: 'center',
          textStyle: {
            color: title.color,
            fontSize: 16
          }
        }
      : undefined

    return (
      <div>
        {!series ? (
          <p className={styles.noData}>暂时没数据</p>
        ) : (
          <ReactEchartsCore
            className={styles.chart}
            echarts={echarts}
            ref={e => reference(e)}
            option={{
              animation: false,
              color: PRIMARY_COLORS,
              title: titleObj,
              tooltip: {
                trigger: 'none',
                show: false,
                formatter(data) {
                  if (data.name === 'invisible') {
                    return
                  }
                  return data.name
                }
              },
              legend: {
                orient: 'left',
                right: 0,
                y: 'bottom',
                z: 0,
                data: (legendData || []).map(d => ({
                  name: d,
                  icon: 'roundRect'
                })),
                formatter: legendFormatter
              },
              toolbox: {
                show: false
              },
              series: finalSeries
            }}
          />
        )}
      </div>
    )
  }
}

export default AnnularPieCharts

function getFinalSeries(series, barGap, barWidth, initRadius, invisibleItem) {
  return (series || []).map((serie, index) => {
    const radiusStart = (initRadius || 20) + index * barGap + barWidth * index
    return {
      name: serie.name,
      type: 'pie',
      silent: true,
      itemStyle: {
        normal: {
          label: { show: false },
          labelLine: { show: false }
        }
      },
      radius: [radiusStart, radiusStart + barWidth],
      data: [
        {
          value: serie.value,
          name: serie.tooltip,
          itemStyle: {
            color: serie.color,
            opacity: 1
          }
        },
        {
          value: 100 - serie.value,
          ...invisibleItem
        }
      ]
    }
  })
}
