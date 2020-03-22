import React, { Component } from 'react'

import { Table } from 'antd'

import LeftSpan from '../LeftSpan'

import styles from './index.less'

// 传进来父组件 - 大楼信息集合
const buildingInfos = [
  {
    id: 23,
    name: 'SINOOCEAN_BJ_YYDS',
    displayText: '远洋大厦',
    coordinate: {
      longitude: 116.4914676333,
      latitude: 39.9147961678
    },
    country: {
      name: '中国',
      displayText: '中国'
    },
    state: {
      name: '北京',
      displayText: '北京'
    },
    city: {
      name: '北京市',
      displayText: '北京市'
    },
    district: {
      name: '',
      displayText: ''
    },
    address: null,
    buildingNo: '远洋大厦',
    fengMapId: 'yuanyang-beijing',
    floors: [
      {
        id: 86,
        level: 31,
        area: 0,
        displayText: '31F',
        deviceNumber: 152,
        workstationSpaceNumber: 103,
        conferenceSpaceNumber: 9,
        plazaSpaceNumber: 0,
        ancillaryAreaSpaceNumber: 0
      },
      {
        id: 87,
        level: 32,
        area: 0,
        displayText: '32F',
        deviceNumber: 148,
        workstationSpaceNumber: 97,
        conferenceSpaceNumber: 7,
        plazaSpaceNumber: 0,
        ancillaryAreaSpaceNumber: 0
      },
      {
        id: 88,
        level: 33,
        area: 0,
        displayText: '33F',
        deviceNumber: 111,
        workstationSpaceNumber: 86,
        conferenceSpaceNumber: 4,
        plazaSpaceNumber: 0,
        ancillaryAreaSpaceNumber: 0
      }
    ]
  }
]

// 父组件 - 使用率
const buildingAverage = 90

class Second extends Component {
  render() {
    const columns = [
      {
        title: '楼层',
        dataIndex: 'floorName',
        key: 'floorName',
        align: 'center'
      },
      {
        title: '工位数',
        dataIndex: 'deskNumber',
        key: 'deskNumber',
        align: 'center'
      },
      {
        title: '会议室数',
        dataIndex: 'meetingNumber',
        key: 'meetingNumber',
        align: 'center'
      },
      {
        title: '平均使用率',
        dataIndex: 'usageRate',
        key: 'usageRate',
        align: 'center'
      }
    ]

    // 楼层表格数据
    const floorsSoure = buildingInfos && buildingInfos[0] ? buildingInfos[0].floors : []
    const floorAverage = buildingAverage ? buildingAverage : []
    let dataSoure = []
    let obj = {}
    floorsSoure.forEach((item, index) => {
      obj = {
        key: index,
        floorName: item.level ? item.level : '--',
        deskNumber: item.workstationSpaceNumber ? item.workstationSpaceNumber : '--',
        meetingNumber: item.conferenceSpaceNumber ? item.conferenceSpaceNumber : '--',
        usageRate: floorAverage && floorAverage[index] ? floorAverage[index].average + '%' : '--'
      }
      dataSoure.push(obj)
    })

    const tableProps = {
      rowKey: 'id',
      dataSource: dataSoure,
      columns: columns,
      className: styles.table,
      pagination: false
    }

    return (
      <div className={styles.content}>
        <div className={styles.second}>
          <div className={styles.secondTitle}>
            <span>
              <LeftSpan />
            </span>
            <span>办公空间</span>
          </div>
          <div>
            <Table
              {...tableProps}
              size="middle"
              rowKey={(record, index) => record.key}
              // onHeaderRow={styles.tablehearder}
              rowClassName={(record, index) => (index % 2 === 0 ? styles.odd : styles.even)}
            />
          </div>
        </div>
      </div>
    )
  }
}

Second.propTypes = {}
export default Second
