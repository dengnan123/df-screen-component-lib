import React, { Component } from 'react'

import LeftSpan from '../LeftSpan'

import styles from './index.less'

import ProgressLine from '../ProgressLine'

const AirData = [
  {
    data: '23.0',
    name: 'PM2.5'
  },
  {
    data: '506.0',
    name: 'CO2'
  },
  {
    data: '201.00000500679016',
    name: 'TVOC'
  },
  {
    data: '21.0',
    name: 'temperature'
  },
  {
    data: '17.0',
    name: 'humidity'
  }
]

class Third extends Component {
  render() {
    return (
      <div className={styles.content}>
        <div className={styles.third}>
          <div className={styles.nowEnvi}>
            <span>
              <LeftSpan />
            </span>
            <span>当前环境</span>
          </div>
          <div className={styles.enviBox}>
            {AirData ? (
              AirData.map((item, index) => {
                return <ProgressLine key={index} name={item.name} progressLength={item.data} />
              })
            ) : (
              <div style={{ color: '#fff', fontSize: 16, textAlign: 'center', paddingTop: 50, paddingBottom: 50 }}>
                暂无数据
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Third.propTypes = {}
export default Third
