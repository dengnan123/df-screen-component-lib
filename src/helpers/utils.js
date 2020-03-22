import queryString from 'query-string';
import uuid from 'uuid';

export const isProduction = process.env.NODE_ENV === 'production';
export const NODE_SERVER = !isProduction
  ? 'http://localhost:3000'
  : `http://${window.location.host}`;

// 获取元素的绝对位置坐标（像对于页面左上角）
export const getElementPagePosition = element => {
  //计算x坐标
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  } //计算y坐标
  var actualTop = element.offsetTop;
  var currentY = element.offsetParent;
  while (current !== null) {
    actualTop += currentY.offsetTop + currentY.clientTop;
    currentY = currentY.offsetParent;
  } //返回结果
  return { x: actualLeft, y: actualTop };
};

export function getMapRoot(params) {
  // eslint-disable-next-line no-undef
  //   if (MAP_TYPE) {
  // eslint-disable-next-line no-undef
  return {
    // eslint-disable-next-line no-undef
    mapServerURL: `${NODE_SERVER}/${MAP_ID}`,
    // eslint-disable-next-line no-undef
    mapThemeURL: `${NODE_SERVER}/${MAP_TYPE}`,
  };
  //   }
  //   return {
  //     mapServerURL: `/maps`,
  //     mapThemeURL: `/maps/themes`
  //   }
}

export function getParseSearch() {
  return queryString.parse(window.location.search);
}

export const filterObj = (data, optArr) => {
  if (JSON.stringify(data) === '{}') {
    return data;
  }
  if (!optArr || !optArr.length) {
    return data;
  }
  let newData = {};
  const keys = Object.keys(data);
  for (const key of keys) {
    const value = data[key];
    if (optArr.includes(value)) {
      continue;
    }
    newData[key] = value;
  }
  return newData;
};

export const toTop = (id, arr) => {
  let data = {};
  const maxIndex = arr[0].zIndex;
  data = arr.filter(v => v.id === id)[0];

  if (maxIndex === data.zIndex) {
    return {
      newArr: arr,
      data,
    };
  }

  const newArr = arr.map(v => {
    if (v.id === id) {
      data = {
        ...v,
        zIndex: maxIndex + 1,
      };
      return {
        ...v,
        zIndex: maxIndex + 1,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toBottom = (id, arr) => {
  let data = {};
  const minIndex = arr[arr.length - 1].zIndex;
  data = arr.filter(v => v.id === id)[0];
  if (minIndex === data.zIndex) {
    return {
      newArr: arr,
      data,
    };
  }

  const newArr = arr.map(v => {
    if (v.id === id) {
      data = {
        ...v,
        zIndex: minIndex - 1,
      };
      return {
        ...v,
        zIndex: minIndex - 1,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toUpperLevel = (id, arr) => {
  let nowLocaltion;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      nowLocaltion = i;
      break;
    }
  }
  if (nowLocaltion === 0) {
    return arr;
  }
  const preLocaltion = nowLocaltion - 1;
  const preIndex = arr[preLocaltion].zIndex;

  let data = {};

  const newArr = arr.map(v => {
    if (v.id === id) {
      data = {
        ...v,
        zIndex: preIndex + 1,
      };
      return {
        ...v,
        zIndex: preIndex + 1,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toLowLevel = (id, arr) => {
  let nowLocaltion;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      nowLocaltion = i;
      break;
    }
  }
  if (nowLocaltion === arr.length - 1) {
    return arr;
  }
  const nextLocaltion = nowLocaltion + 1;
  const nextIndex = arr[nextLocaltion].zIndex;

  let data = {};

  const newArr = arr.map(v => {
    if (v.id === id) {
      data = {
        ...v,
        zIndex: nextIndex - 1,
      };
      return {
        ...v,
        zIndex: nextIndex - 1,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toLevelCenter = (id, arr, { pageWidth }) => {
  let data = {};
  const newArr = arr.map(v => {
    if (v.id === id) {
      const { width } = v;
      data = {
        ...v,
        left: pageWidth / 2 - width / 2,
      };
      return {
        ...v,
        left: pageWidth / 2 - width / 2,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toVerticalCenter = (id, arr, { pageHeight }) => {
  let data = {};
  const newArr = arr.map(v => {
    if (v.id === id) {
      const { height } = v;
      data = {
        ...v,
        top: pageHeight / 2 - height / 2,
      };
      return {
        ...v,
        top: pageHeight / 2 - height / 2,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

export const toLevelVerticalCenter = (id, arr, { pageHeight, pageWidth }) => {
  let data = {};
  const newArr = arr.map(v => {
    if (v.id === id) {
      const { height, width } = v;
      data = {
        ...v,
        top: pageHeight / 2 - height / 2,
        left: pageWidth / 2 - width / 2,
      };
      return {
        ...v,
        top: pageHeight / 2 - height / 2,
        left: pageWidth / 2 - width / 2,
      };
    }
    return v;
  });

  return {
    data,
    newArr,
  };
};

//获取最小left
export const getMinLeft = arr => {
  if (!arr || !arr.length) {
    return;
  }
  const sortArr = arr.sort(function(a, b) {
    return a.left - b.left;
  });

  return sortArr[0];
};

export const getMaxLeft = arr => {
  if (!arr || !arr.length) {
    return;
  }
  const sortArr = arr.sort(function(a, b) {
    return a.left - b.left;
  });

  return sortArr[sortArr.length - 1];
};

//获取最小top
export const getMinTop = arr => {
  if (!arr || !arr.length) {
    return;
  }
  const sortArr = arr.sort(function(a, b) {
    return a.top - b.top;
  });

  return sortArr[0];
};

export const getMaxTop = arr => {
  if (!arr || !arr.length) {
    return;
  }
  const sortArr = arr.sort(function(a, b) {
    return a.top - b.top;
  });

  return sortArr[sortArr.length - 1];
};

// 获取最大width
export const getMaxWidth = (pageWidth, arr) => {
  if (!arr || !arr.length) {
    return;
  }

  const { left } = getMinLeft(arr);
  const minLeft = left;
  const minRight = getMinRight(pageWidth, arr);
  return pageWidth - minLeft - minRight;
};

// 获取元素中的最小 right
export const getMinRight = (pageWidth, arr) => {
  const newArr = arr
    .map(v => {
      return {
        ...v,
        right: pageWidth - v.width - v.left,
      };
    })
    .sort(function(a, b) {
      return a.right - b.right;
    });
  return newArr[0].right;
};

// 回去元素中的最小 bottom
export const getMinBottom = (pageHeight, arr) => {
  const newArr = arr
    .map(v => {
      return {
        ...v,
        bottom: pageHeight - v.height - v.top,
      };
    })
    .sort(function(a, b) {
      return a.bottom - b.bottom;
    });
  return newArr[0].bottom;
};

// 获取高度
export const getHeightDiff = (pageHeight, arr) => {
  if (!arr || arr.length < 2) {
    return;
  }
  const { top } = getMinTop(arr);
  const minBottom = getMinBottom(pageHeight, arr);
  const minTop = top;
  return pageHeight - minTop - minBottom;
};

// 根据多选生成最新的数据

export const generaterArrByMul = (mulArr, arr, opt) => {
  const idArr = mulArr.map(v => v.id);
  const info = mulArr[0];
  console.log('idArridArr', idArr);
  console.log('arrarr', arr);
  const newArr = arr.filter(v => {
    if (idArr.includes(v.id)) {
      return false;
    }
    return true;
  });
  console.log('newArrnewArr', newArr);
  const resArr = [
    ...newArr,
    {
      ...info,
      id: uuid.v4(),
      ...opt,
      child: mulArr,
    },
  ];

  return resArr;
};

// 把成组数据还原成扁平数组
export const reductionArr = arr => {
  const dealWithChild = child => {
    return child
      .reduce((pre, next) => {
        const { child } = next;
        if (child && child.length) {
          return [...pre, ...dealWithChild(child)];
        }
        return [...pre, next];
      }, [])
      .filter(v => {
        if (v.child) {
          return false;
        }
        return true;
      });
  };
  const newArr = arr
    .reduce((pre, next) => {
      const { child } = next;
      if (child && child.length) {
        return [...pre, ...dealWithChild(child)];
      }
      return [...pre, next];
    }, [])
    .filter(v => {
      if (v.child) {
        return false;
      }
      return true;
    });

  return newArr;
};

// 处理拖拽结束之后的 left  和 top 把父元素的移动 同步到所有子元素
export const dealWithDrapStopData = (useCompList, data, id) => {
  const dealWithChild = ({ child, leftDiff, topDiff }) => {
    return child.map(v => {
      const resData = {
        ...v,
        left: v.left + leftDiff,
        top: v.top + topDiff,
      };
      if (!v.child) {
        return resData;
      }
      const _child = dealWithChild({
        child: v.child,
        leftDiff,
        topDiff,
      });
      resData.child = _child;
      return resData;
    });
  };
  return useCompList.map(v => {
    if (v.id === id) {
      const resData = {
        ...v,
        ...data,
      };
      const { child, left: oldLeft, top: oldTop } = v;
      if (child && child.length) {
        const leftDiff = data.left - oldLeft;
        const topDiff = data.top - oldTop;
        const _child = dealWithChild({
          child,
          leftDiff,
          topDiff,
        });
        resData.child = _child;
      }
      return resData;
    }
    return v;
  });
};

// function flatDeep(arr, d = 1) {
//   return d > 0
//     ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
//     : arr.slice();
// }

export const hashDeduplication = (arr, key) => {
  let obj = {};
  return arr.filter(v => {
    const _key = v[key];
    if (obj[_key]) {
      return false;
    }
    obj[_key] = 1;
    return true;
  });
};
