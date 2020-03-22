import React, { Component } from 'react'
import LeftSpan from '../LeftSpan'
import CircleCharts from '../ECharts/CricleCharts'

import styles from './index.less'

// 需要父组件传进来的数据结构 - 大楼详细数据
const floorInfos = {
  OVERVIEW: {
    totalSpaceAverage: 17.36509257445416,
    assignmentRatio: {
      shared: 36.61,
      private: 63.39
    },
    spaceAttrRatio: {
      enclosed: 8.04,
      open: 91.96,
      half: 0
    }
  },
  WORKSTATION: {
    totalSpaceAverage: 19.628744601286638,
    assignmentRatio: {
      shared: 31.07,
      private: 68.93
    },
    spaceAttrRatio: {
      enclosed: 0,
      open: 100,
      half: 0
    },
    spaceDistributionByModel: [
      {
        model: 'HIVE',
        number: 71
      },
      {
        model: 'HOTDESK',
        number: 32
      }
    ]
  },
  CONFERENCE: {
    totalSpaceAverage: 12.863602245699601,
    assignmentRatio: {
      shared: 100,
      private: 0
    },
    spaceAttrRatio: {
      enclosed: 100,
      open: 0,
      half: 0
    },
    spaceDistributionByModel: [
      {
        model: 'MEETING',
        number: 9
      }
    ],
    dailyUsageAverageTime: {
      workingHour: 9,
      averageTime: 1.16
    }
  },
  PLAZA: null,
  ANCILLARYAREA: null
}

class First extends Component {
  render() {
    let DESKNUMBER = 0
    let MEETNUMBER = 0
    let arrDeskNumber = floorInfos && floorInfos.WORKSTATION ? floorInfos.WORKSTATION.spaceDistributionByModel : []
    let arrMeetingNumber = floorInfos && floorInfos.CONFERENCE ? floorInfos.CONFERENCE.spaceDistributionByModel : []
    DESKNUMBER = arrDeskNumber.reduce((prev, cur) => {
      return prev + cur.number
    }, 0)
    MEETNUMBER = arrMeetingNumber.reduce((prev, cur) => {
      return prev + cur.number
    }, 0)

    return (
      <div className={styles.content}>
        <div className={styles.first}>
          <div>
            <span>
              <LeftSpan />
            </span>
            <span>空间使用率</span>
          </div>
          <div>
            <div className={styles.green}>
              <CircleCharts
                remainingColor={'#64dabd'}
                perceColor={'#64dabd40'}
                perceNumber={
                  floorInfos && floorInfos.WORKSTATION ? floorInfos.WORKSTATION.totalSpaceAverage.toFixed(2) : 0
                }
              />
              <span className={styles.usageRate}>工位空间使用率</span>
            </div>
            <div className={styles.red}>
              <CircleCharts
                remainingColor={'#da5e5e'}
                perceColor={'#da5e5e40'}
                perceNumber={
                  floorInfos && floorInfos.CONFERENCE ? floorInfos.CONFERENCE.totalSpaceAverage.toFixed(2) : 0
                }
              />
              <span className={styles.usageRate}>会议空间使用率</span>
            </div>
            <div className={styles.numberLine}>
              <div style={{ height: `${DESKNUMBER * 0.5}%` }} className={styles.numberGreenBox}>
                <span className={styles.number}>{DESKNUMBER}</span>
                <span className={styles.name}>工位数量</span>
              </div>
            </div>
            <div className={styles.numberLine}>
              <div style={{ height: `${MEETNUMBER * 0.5}%` }} className={styles.numberRedBox}>
                <span className={styles.number}>{MEETNUMBER}</span>
                <span className={styles.name}>会议室数</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

First.propTypes = {}
export default First
