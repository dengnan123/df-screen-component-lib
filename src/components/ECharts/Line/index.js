import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

import util from '../util';
import { reap } from 'safe-reaper';

import staticData from '@/helpers/static';

function isString(v) {
  return Object.prototype.toString.call(v) === '[object String]';
}

function isNumber(v) {
  return Object.prototype.toString.call(v) === '[object Number]';
}

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

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
    const { categories, series } = staticData['Line']();
    let echarts_instance = this.echarts_react.getEchartsInstance();
    this.setState({
      initSeries: series,
      initCategories: categories,
      echarts_instance,
    });
    // const chat = document.getElementById('echats');
    if (echarts_instance) {
      echarts_instance.on('mouseout', 'series', this.start);
      echarts_instance.on('mouseover', 'series', this.clear);
      echarts_instance.on('click', function(params) {
        console.log('click213224', params);
      });
    }
  }

  clear = () => {
    const { timerId, echarts_instance } = this.state;
    console.log('清理......', timerId);
    clearInterval(timerId);
    echarts_instance.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
    });
  };

  start = () => {
    const { doTimer, timer } = this.state;
    if (doTimer) {
      console.log('开始');
      this.tooltipTimer(timer);
    }
  };

  componentDidUpdate() {
    const { doTimer, timer } = this.state;
    const { style: option = {} } = this.props;
    const propsDoTimer = reap(option, 'grid.tooltip.doTimer', false);
    let propsTimer = reap(option, 'grid.tooltip.timer', 3);

    if (
      JSON.stringify(doTimer) !== JSON.stringify(propsDoTimer) ||
      JSON.stringify(propsTimer) !== JSON.stringify(timer)
    ) {
      this.setState(
        {
          doTimer: propsDoTimer,
          timer: propsTimer,
        },
        () => {
          if (propsDoTimer) {
            // 开启定时器
            this.tooltipTimer(timer);
          } else {
            // 关闭
            this.clear();
          }
        },
      );
    }
  }

  componentWillUnmount() {
    const { timerId } = this.state;
    clearInterval(timerId);
  }

  // 触发tooltip轮播定时器
  tooltipTimer = () => {
    const that = this;
    const { echarts_instance, initSeries, timer } = this.state;
    this.clear();

    echarts_instance.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: 0,
    });

    const { mockData = {} } = this.props;
    const { series = initSeries } = mockData;
    const timerId = setInterval(() => {
      const { tooltipIndex } = that.state;

      echarts_instance.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: tooltipIndex,
      });

      let newIndex = tooltipIndex + 1;
      // console.log('newIndexnewIndex', newIndex);
      if (newIndex >= series[0].data.length) {
        newIndex = 0;
      }
      that.setState({
        tooltipIndex: newIndex,
      });
    }, timer * 1000);
    console.log('订婚时期ID', timerId);
    this.setState({
      timerId,
    });
  };

  getOption = ({ categories, series, type = 'line', option }) => {
    const op = util[type]({ categories, series, option });

    return op;
  };

  checkSeries = series => {
    if (!isArray(series)) {
      return 'series不是数组';
    }
    for (const v of series) {
      const { data } = v;

      if (!isArray(data)) {
        return 'series里面的data不是数组';
      }
      for (const item of data) {
        if (!isNumber(item)) {
          return 'series data里面的数据不是数字';
        }
      }
    }
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

  _onEvents = {
    clcik: this.clear,
    // dataZoom: this.onDataZoom,
  };

  render() {
    const { data = {}, style: option = {} } = this.props;

   

    const { initSeries, initCategories } = this.state;

    const { series = initSeries, categories = initCategories, type = 'line' } = data;

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
