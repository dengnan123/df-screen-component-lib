import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

import util from '../util';
// import { reap } from 'safe-reaper';

// import { pie } from '../../../helpers/static';
import staticData from '@/helpers/static';

function isString(v) {
  return Object.prototype.toString.call(v) === '[object String]';
}

function isNumber(v) {
  return Object.prototype.toString.call(v) === '[object Number]';
}

// function isArray(v) {
//   return Object.prototype.toString.call(v) === '[object Array]';
// }

export default class Lunar extends PureComponent {
  state = {
    initSeries: [],
    initCategories: [],
    echarts_instance: null,
    tooltipIndex: 0,
    doTimer: false,
    timer: 3,
  };

  componentDidMount() {
    const { categories, series } = staticData['Pie']();
    let echarts_instance = this.echarts_react.getEchartsInstance();
    this.setState({
      initSeries: series,
      initCategories: categories,
      echarts_instance,
    });
  }

  getOption = ({ categories, series, type, option }) => {
    const op = util[type]({ categories, series, option });

    return op;
  };

  checkSeries = series => {
    // if (!isArray(series)) {
    //   return 'series不是数组';
    // }
    // for (const v of series) {
    //   const { data } = v;

    //   if (!isArray(data)) {
    //     return 'series里面的data不是数组';
    //   }
    //   for (const item of data) {
    //     if (!isNumber(item)) {
    //       return 'series data里面的数据不是数字';
    //     }
    //   }
    // }
    return false;
  };

  checkCategories = categories => {
    // 检查categories
    for (const item of categories) {
      if (!isNumber(item) && !isString(item)) {
        return 'categories里面的数据不是数字或者文字';
      }
    }
    return false;
  };

  _onEvents = {};

  render() {
    const { data = {}, style: option = {} } = this.props;

    const { initSeries, initCategories } = this.state;

    const { series = initSeries, categories = initCategories, type = 'pie' } = data;

    const checkS = this.checkSeries(series);
    if (checkS) {
      return <div>{checkS}</div>;
    }
    const checkC = this.checkCategories(categories);
    if (checkC) {
      return <div>{checkC}</div>;
    }

    return (
      <ReactEcharts
        id="echats"
        notMerge={true}
        lazyUpdate={true}
        ref={e => {
          this.echarts_react = e;
        }}
        option={this.getOption({
          series,
          categories,
          type,
          option,
        })}
        style={{ height: '100%', width: '100%' }}
        className="react_for_echarts"
        onEvents={this._onEvents}
      />
    );
  }
}
