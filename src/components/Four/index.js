import React, { Component } from 'react';
import moment from 'moment';
import LeftSpan from '../LeftSpan';
import AreaCharts from '../ECharts/AreaCharts';

import styles from './index.less';

const rote = [
  {
    average: 4.67947345890411,
    peak: 11.301369863013697,
    date: 1580140800000,
  },
  {
    average: 4.133612064036592,
    peak: 9.777015437392796,
    date: 1580745600000,
  },
  {
    average: 9.215896118721462,
    peak: 15.890410958904111,
    date: 1581955200000,
  },
  {
    average: 5.526699862637362,
    peak: 9.340659340659341,
    date: 1581609600000,
  },
  {
    average: 4.42752849002849,
    peak: 11.794871794871794,
    date: 1580918400000,
  },
  {
    average: 4.084757834757835,
    peak: 7.521367521367521,
    date: 1579104000000,
  },
  {
    average: 11.259716506630086,
    peak: 20.16460905349794,
    date: 1582646400000,
  },
  {
    average: 11.997003424657535,
    peak: 23.15068493150685,
    date: 1582128000000,
  },
  {
    average: 5.309543304221251,
    peak: 10.043668122270741,
    date: 1579622400000,
  },
  {
    average: 3.96957049086758,
    peak: 8.904109589041095,
    date: 1580659200000,
  },
  {
    average: 4.029088050314465,
    peak: 10.977701543739279,
    date: 1581004800000,
  },
  {
    average: 4.746004566210046,
    peak: 7.534246575342466,
    date: 1581436800000,
  },
  {
    average: 9.118864155251142,
    peak: 16.71232876712329,
    date: 1581868800000,
  },
  {
    average: 4.427537812681791,
    peak: 8.37696335078534,
    date: 1579449600000,
  },
  {
    average: 12.002010233918128,
    peak: 20.029239766081872,
    date: 1582560000000,
  },
  {
    average: 4.873894121004566,
    peak: 9.76027397260274,
    date: 1580400000000,
  },
  {
    average: 5.408996860730594,
    peak: 10.787671232876713,
    date: 1580227200000,
  },
  {
    average: 5.212620027434842,
    peak: 8.50480109739369,
    date: 1581523200000,
  },
  {
    average: 4.431527303754266,
    peak: 10.580204778156997,
    date: 1580832000000,
  },
  {
    average: 5.000535102739726,
    peak: 10.445205479452055,
    date: 1580313600000,
  },
  {
    average: 11.019411473788328,
    peak: 20.77151335311573,
    date: 1582214400000,
  },
  {
    average: 4.188962614155251,
    peak: 8.047945205479452,
    date: 1579795200000,
  },
  {
    average: 9.910816210045661,
    peak: 18.493150684931507,
    date: 1582041600000,
  },
  {
    average: 4.700877568493151,
    peak: 10.95890410958904,
    date: 1580054400000,
  },
  {
    average: 4.789526255707763,
    peak: 8.356164383561644,
    date: 1581350400000,
  },
  {
    average: 4.30455532693187,
    peak: 7.270233196159122,
    date: 1581264000000,
  },
  {
    average: 4.78219696969697,
    peak: 9.777015437392796,
    date: 1579190400000,
  },
  {
    average: 11.76583904109589,
    peak: 20.82191780821918,
    date: 1582473600000,
  },
  {
    average: 4.940410199556541,
    peak: 11.086474501108649,
    date: 1579536000000,
  },
  {
    average: 4.117277298850574,
    peak: 8.793103448275861,
    date: 1579708800000,
  },
];

class Four extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start:
        moment(
          moment()
            .subtract(1, 'months')
            .add(-1, 'day')
            .format('YYYY-MM-DD 00:00:00'),
        ).unix() * 1000,
      end: moment(moment().format('YYYY-MM-DD 23:59:59')).unix() * 1000,
      MapUsageRote31: rote,
      usageRote: [],
    };
  }

  componentDidMount() {
    const { MapUsageRote31, start, end } = this.state;
    this.setState({
      usageRote: MapUsageRote31.filter(item => item.date >= start && item.date <= end),
    });
  }

  render() {
    const { usageRote } = this.state;
    const officeData = forUsageTrendByDateAreaChart(usageRote);
    return (
      <div className={styles.content}>
        <div className={styles.four}>
          <div className={styles.fourTitle}>
            <span>
              <LeftSpan />
            </span>
            <span>空间使用趋势</span>
          </div>
          <div className={styles.usageTips}>
            <AreaCharts
              series={officeData.series}
              legendData={officeData.legendData}
              xAxisData={officeData.xAxisData}
              yAxisUnit={officeData.yAxisUnit}
            />
          </div>
        </div>
      </div>
    );
  }
}

Four.propTypes = {};
export default Four;
function forUsageTrendByDateAreaChart(data) {
  if (!data) {
    return {};
  }
  const xAxisData = data.map(trend => moment(trend.date).format('MM-DD'));
  const series = [
    {
      name: '平均使用率',
      z: 3,
      data: data.map(trend => trend.average),
    },
    {
      name: '使用率峰值',
      z: 2,
      data: data.map(trend => trend.peak),
    },
  ];
  const legendData = ['平均使用率', '使用率峰值'];
  return {
    series,
    legendData,
    xAxisData,
    yAxisUnit: '%',
  };
}
