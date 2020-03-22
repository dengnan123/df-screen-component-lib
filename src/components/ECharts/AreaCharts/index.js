import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactEchartsCore from 'echarts-for-react/lib/core'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

import styles from './index.less'

const DEFAULT_COLORS = ['#64DABD', '#37735d']

class LineAndAreaCharts extends Component {
  static propTypes = {
    app: PropTypes.object,
    series: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        data: PropTypes.arrayOf(PropTypes.number),
        z: PropTypes.number
      })
    ),
    xAxisData: PropTypes.arrayOf(PropTypes.string),
    legendData: PropTypes.arrayOf(PropTypes.string),
    yAxisUnit: PropTypes.string,
    reference: PropTypes.any,
    colors: PropTypes.arrayOf(PropTypes.string)
  }

  render() {
    const { series, colors, xAxisData, legendData, yAxisUnit } = this.props
    const finalSeries = getFinalSeries(series)
    let isData = xAxisData
    if (xAxisData) {
      isData = xAxisData.length
    }

    return (
      <div>
        {!isData ? (
          <p className={styles.noData}>暂时没有数据</p>
        ) : (
          <ReactEchartsCore
            echarts={echarts}
            // ref={e => reference(e)}
            option={{
              animation: false,
              color: colors || DEFAULT_COLORS,
              tooltip: {
                trigger: 'axis',
                position: function(point, params, dom, rect, size) {
                  return [point[0], '19']
                },
                backgroundColor: 'transparent',
                textStyle: {
                  color: '#B9BDC8'
                },
                formatter(data) {
                  const lines = [data[0].axisValueLabel]
                  lines.push(
                    ...data.map(d => {
                      const value = d.data
                      if (value === 0 || value === 100) {
                        return `${d.seriesName}: ${value}${yAxisUnit || ''}`
                      } else {
                        const fixedData = value.toFixed(2)
                        return `${d.seriesName}: ${fixedData}${yAxisUnit || ''}`
                      }
                    })
                  )
                  const arr = lines.slice(1).join('&nbsp;&nbsp;')
                  const first = String(lines[0]).concat('<br />')
                  return first.concat(arr)
                }
              },
              legend: {
                right: '1%',
                data: (legendData || []).map(d => ({
                  name: d,
                  icon: 'roundRect',
                  textStyle: {
                    color: '#C7CAD5',
                    fontSize: '14px'
                  }
                })),
                padding: [10, 0],
                itemWidth: 12,
                itemHeight: 12
                // itemGap: -5
              },
              toolbox: {
                show: false
              },
              grid: {
                left: '0px',
                right: '0px',
                top: '10px',
                bottom: '10px',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: false,
                  minInterval: 3,
                  axisLabel: {
                    interval: 2,
                    rotate: 30,
                    textStyle: {
                      color: '#9598A5',
                      fontSize: '18px'
                    }
                  },
                  axisLine: {
                    show: false
                  },
                  axisPointer: {
                    lineStyle: {
                      color: '#A6F8C0',
                      width: 2
                    }
                  },
                  axisTick: { show: false },
                  data: xAxisData
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  max: 100,
                  axisLine: {
                    show: false
                  },
                  splitLine: {
                    show: false
                  },
                  axisTick: { show: false },
                  axisLabel: {
                    textStyle: {
                      color: '#9598A5',
                      fontSize: '18px'
                    },
                    formatter(val) {
                      return `${val}`
                    }
                  }
                }
              ],
              series: finalSeries
            }}
            style={{ height: 200 }}
          />
        )}
      </div>
    )
  }
}

export default LineAndAreaCharts

function getFinalSeries(series) {
  if (!series || !series.length) {
    return []
  }

  return series.map(serie => {
    return {
      name: serie.name,
      z: serie.z,
      data: serie.data,
      type: 'line',
      smooth: true,
      areaStyle: { opacity: 1 },
      itemStyle: {
        opacity: 0
      },
      label: {
        show: false,
        formatter(params) {
          const value = params.value
          if (value === 0) {
            return ''
          }
          if (value === 100) {
            return `${value}%`
          } else {
            const fixedData = value.toFixed(2)
            return `${fixedData}%`
          }
        }
      }
    }
  })
}
