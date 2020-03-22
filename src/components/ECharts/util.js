const line = ({ categories = [], series = [], option = {} }) => {
  const optSeries = option.series || [];
  const newSeries = getSeries(series, optSeries);
  const optX = getX(option.xAxis);
  const optY = getY(option.yAxis);
  const optL = getLegend(categories, option.legend);
  const optG = getG(option.grid);
  let initData = {
    legend: {
      ...optL,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      ...optG,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLabel: {
        color: '#ffff',
        fontSize: 16,
      },
      ...optX,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#ffff',
        fontSize: 16,
      },
      ...optY,
    },
    series: newSeries,
  };
  return initData;
};

const bar = ({ categories = [], series = [], option = {} }) => {
  const optSeries = option.series || [];
  const newSeries = getSeries(series, optSeries);
  const optX = getX(option.xAxis);
  const optY = getY(option.yAxis);
  const optL = getLegend(categories, option.legend);
  const optG = getG(option.grid);
  let initData = {
    legend: {
      ...optL,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      ...optG,
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: categories,
      axisLabel: {
        color: '#ffff',
        fontSize: 16,
      },
      ...optX,
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#ffff',
        fontSize: 16,
      },
      ...optY,
    },
    series: newSeries,
  };

  const newY = JSON.parse(JSON.stringify(initData.xAxis));
  const newX = JSON.parse(JSON.stringify(initData.yAxis));

  //  x y 翻转
  if (option.xyInverse) {
    initData.xAxis = newX;
    initData.yAxis = newY;
  }

  return initData;
};

const pie = ({ categories = [], series = [], option = {} }) => {
  const optSeries = option.series || {};
  const newSeries = getPieSeries(series, optSeries);
  const optL = getLegend(categories, option.legend);

  let initData = {
    legend: {
      ...optL,
    },
    tooltip: {
      trigger: 'axis',
    },
    series: newSeries,
  };

  return initData;
};

export default {
  line,
  bar,
  pie,
};

function getSeries(series, optSeries) {
  return series.map(v => {
    // const { name } = v;
    let data = {
      ...v,
    };
    for (const item of optSeries) {
      // if (item.name === name) {
      data = {
        ...data,
        ...item,
      };
      if (!data.areaStyle) {
        delete data.areaStyle;
      }
      break;
      // }
    }
    return data;
  });
}

function getX(optX) {
  if (!optX) {
    return {};
  }
  let data = JSON.parse(JSON.stringify(optX));
  // 数据库 show true 这里面要变成fasle  fasle 变成 true
  if (data.show) {
    data.show = false;
  } else {
    data.show = true;
  }
  if (data.axisLabel) {
    if (data.axisLabel.interval) {
      data.axisLabel.interval = 0;
    } else {
      data.axisLabel.interval = 'auto';
    }
  }
  return data;
}

function getY(optY) {
  if (!optY) {
    return {};
  }
  let data = JSON.parse(JSON.stringify(optY));
  // 数据库 show true 这里面要变成fasle  fasle 变成 true
  if (data.show) {
    data.show = false;
  } else {
    data.show = true;
  }
  if (data.splitLine) {
    if (data.splitLine.show) {
      data.splitLine.show = false;
    } else {
      data.splitLine.show = true;
    }
  }
  if (data.splitArea) {
    if (data.splitArea.show) {
      data.splitArea.show = false;
    } else {
      data.splitArea.show = true;
    }
  }
  return data;
}

function getLegend(categories, optL) {
  const data = categories.map(v => {
    return v;
  });
  let legend = {
    ...optL,
  };
  legend.data = data;
  if (legend.position === 'top') {
    legend.top = 0;
    legend.left = 'center';
  }
  if (legend.position === 'left') {
    legend.left = 0;
    legend.orient = 'vertical';
  }
  if (legend.position === 'right') {
    legend.right = 0;
    legend.orient = 'vertical';
  }
  if (legend.position === 'bottom') {
    legend.left = 'center';
    legend.bottom = 0;
  }
  return legend;
}

function getG(optG) {
  if (!optG) {
    return {};
  }
  const _optG = JSON.parse(JSON.stringify(optG));
  if (_optG.left) {
    _optG.left = `${_optG.left}%`;
  }
  if (_optG.right) {
    _optG.right = `${_optG.right}%`;
  }
  return _optG;
}

function getPieSeries(series, optSeries) {
  let _opt = {
    ...optSeries,
    type: 'pie',
  };
  if (_opt.isRing) {
    // 设置为环形
    _opt.radius = ['50%', '100%'];
    delete _opt.isRing;
  }
  return series.map(v => {
    return {
      ...v,
      ..._opt,
    };
  });
}
