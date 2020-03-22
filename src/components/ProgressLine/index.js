import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'

function ProgressLine(props) {
  const { name, progressLength } = props
  let bgColor = '#7DCC99'

  // 进度条不同颜色
  // if (name === 'PM2.5') {
  //   if (progressLength <= 35) {
  //     bgColor = '#7DCC99'
  //   } else if (progressLength > 35 && progressLength <= 75) {
  //     bgColor = '#f2c87b'
  //   } else {
  //     bgColor = '#da5e5e'
  //   }
  // } else if (name === 'CO2') {
  //   if (progressLength <= 700) {
  //     bgColor = '#7DCC99'
  //   } else if (progressLength > 700 && progressLength <= 900) {
  //     bgColor = '#f2c87b'
  //   } else {
  //     bgColor = '#da5e5e'
  //   }
  // } else if (name === 'TVOC') {
  //   if (progressLength <= 117) {
  //     bgColor = '#7DCC99'
  //   } else if (progressLength > 117 && progressLength <= 176) {
  //     bgColor = '#f2c87b'
  //   } else {
  //     bgColor = '#da5e5e'
  //   }
  // } else if (name === 'temperature') {
  //   if (progressLength > 20 && progressLength < 30) {
  //     bgColor = '#7DCC99'
  //   } else if ((progressLength >= 10 && progressLength <= 20) || (progressLength >= 30 && progressLength <= 40)) {
  //     bgColor = '#f2c87b'
  //   } else {
  //     bgColor = '#da5e5e'
  //   }
  // } else if (name === 'humidity') {
  //   if (progressLength >= 30 && progressLength <= 60) {
  //     bgColor = '#7DCC99'
  //   } else if ((progressLength >= 10 && progressLength < 30) || (progressLength > 60 && progressLength <= 80)) {
  //     bgColor = '#f2c87b'
  //   } else {
  //     bgColor = '#da5e5e'
  //   }
  // }

  return (
    <div className={styles.box}>
      <div>
        <span className={styles.name}>
          <span style={{ paddingRight: 10 }}>
            {name ? (name === 'temperature' ? '温度' : name === 'humidity' ? '湿度' : name) : null}:
          </span>
          <span>{progressLength ? Number(progressLength).toFixed(0) : 0}</span>
          <span>
            {name === 'PM2.5'
              ? 'ug/m³'
              : name === 'CO2'
              ? 'ppm'
              : name === 'TVOC'
              ? 'ppb'
              : name === 'temperature'
              ? '℃'
              : name === 'humidity'
              ? '%'
              : null}
          </span>
        </span>

        {/* 优良差区间 */}
        <div>
          {/* {name === 'PM2.5' ? (
          progressLength <= 35 ? (
            <span className={styles.level} style={{ color: '#7DCC99' }}>
              优
            </span>
          ) : progressLength > 35 && progressLength <= 75 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              良
            </span>
          ) : progressLength > 75 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              差
            </span>
          ) : null
        ) : null}

        {name === 'CO2' ? (
          progressLength <= 700 ? (
            <span className={styles.level} style={{ color: '#7DCC99' }}>
              优
            </span>
          ) : progressLength > 700 && progressLength <= 900 ? (
            <span className={styles.level} style={{ color: '#f2c87b' }}>
              良
            </span>
          ) : progressLength > 900 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              差
            </span>
          ) : null
        ) : null}

        {name === 'TVOC' ? (
          progressLength <= 117 ? (
            <span className={styles.level} style={{ color: '#7DCC99' }}>
              优
            </span>
          ) : progressLength > 117 && progressLength <= 176 ? (
            <span className={styles.level} style={{ color: '#f2c87b' }}>
              良
            </span>
          ) : progressLength > 176 && progressLength <= 300 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              差
            </span>
          ) : progressLength > 300 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              极差
            </span>
          ) : null
        ) : null}

        {name === 'temperature' ? (
          progressLength > 20 && progressLength < 30 ? (
            <span className={styles.level} style={{ color: '#7DCC99' }}>
              优
            </span>
          ) : (progressLength >= 10 && progressLength <= 20) || (progressLength >= 30 && progressLength <= 40) ? (
            <span className={styles.level} style={{ color: '#f2c87b' }}>
              良
            </span>
          ) : progressLength < 10 || progressLength > 40 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              差
            </span>
          ) : null
        ) : null}

        {name === 'humidity' ? (
          progressLength >= 30 && progressLength <= 60 ? (
            <span className={styles.level} style={{ color: '#7DCC99' }}>
              优
            </span>
          ) : (progressLength >= 10 && progressLength < 30) || (progressLength > 60 && progressLength <= 80) ? (
            <span className={styles.level} style={{ color: '#f2c87b' }}>
              良
            </span>
          ) : progressLength < 10 || progressLength > 80 ? (
            <span className={styles.level} style={{ color: '#da5e5e' }}>
              差
            </span>
          ) : null
        ) : null} */}
        </div>
      </div>

      {name === 'PM2.5' ? (
        <div className={styles.progressLine} style={{ backgroundColor: bgColor ? `${bgColor}40` : '#7DCC9980' }}>
          <div
            className={styles.progress}
            style={{
              backgroundColor: bgColor ? bgColor : '#7DCC99',
              width: progressLength ? `${(progressLength / 500) * 100}%` : '10%'
            }}
          />
        </div>
      ) : null}

      {name === 'CO2' ? (
        <div className={styles.progressLine} style={{ backgroundColor: bgColor ? `${bgColor}40` : '#7DCC9980' }}>
          <div
            className={styles.progress}
            style={{
              backgroundColor: bgColor ? bgColor : '#7DCC99',
              width: progressLength ? `${(progressLength / 1200) * 100}%` : '10%'
            }}
          />
        </div>
      ) : null}

      {name === 'TVOC' ? (
        <div className={styles.progressLine} style={{ backgroundColor: bgColor ? `${bgColor}40` : '#7DCC9980' }}>
          <div
            className={styles.progress}
            style={{
              backgroundColor: bgColor ? bgColor : '#7DCC99',
              width: progressLength ? `${(progressLength / 400) * 100}%` : '10%'
            }}
          />
        </div>
      ) : null}

      {name === 'temperature' ? (
        <div className={styles.progressLine} style={{ backgroundColor: bgColor ? `${bgColor}40` : '#7DCC9980' }}>
          <div
            className={styles.progress}
            style={{
              backgroundColor: bgColor ? bgColor : '#7DCC99',
              width: progressLength ? `${(progressLength / 50) * 100}%` : '10%'
            }}
          />
        </div>
      ) : null}

      {name === 'humidity' ? (
        <div className={styles.progressLine} style={{ backgroundColor: bgColor ? `${bgColor}40` : '#7DCC9980' }}>
          <div
            className={styles.progress}
            style={{
              backgroundColor: bgColor ? bgColor : '#7DCC99',
              width: progressLength ? `${(progressLength / 100) * 100}%` : '10%'
            }}
          />
        </div>
      ) : null}
    </div>
  )
}

ProgressLine.propTypes = {
  name: PropTypes.string,
  bgColor: PropTypes.string,
  progressColor: PropTypes.string,
  progressLength: PropTypes.any
}
export default ProgressLine

/**
 * 空气质量数据
 * PM2.5	0~35	    35~75 	  >75	                     ug/m3
 *         优	        良	      差
 *
 * CO2	  <=0.07%	  <=0.09%	  <=0.1%
 *        700        900      1000                      ppm
 * 	       优 	      良	      差
 *
 * TVOC	  <=0.2%	  <=0.3%	  <=0.6%    >0.6%
 *        117        176       352      >352            ppb
 * 	      优        	良	      差		    极差
 *
 * 温度	   <10 	 10～20   	20～30    	30~40    	>40    	°C
 * 	       差	     良     	  优	       良	      差
 *
 * 湿度	  <10   10~20	  30~60	  60~80	  >80               %
 * 	      差	   良	      优	    良	    差
 * * */
