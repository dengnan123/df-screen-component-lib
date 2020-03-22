import React, { useState } from 'react';
import {
  toTop,
  toBottom,
  toUpperLevel,
  toLowLevel,
  toLevelCenter,
  toVerticalCenter,
  toLevelVerticalCenter,
} from '@/helpers/utils';
import styles from './index.less';

export default props => {
  const {
    left,
    top,
    clickID,
    sortCompList,
    setUseCompList,
    updatePageComp,
    setVis,
    setAlwaysShowHoverID,
    pageWidth,
    pageHeight,
    doGroup,
    cancelGroup,
    hiddenDoGroup,
  } = props;

  const [hoverName, setName] = useState(null);

  const showHover = hoverName => {
    setName(hoverName);
  };
  const showRefLine = id => {
    setAlwaysShowHoverID(id);
  };

  const eventArr = [
    {
      eventName: 'toTop',
      name: '置顶',
    },
    {
      eventName: 'toBottom',
      name: '置底',
    },
    {
      eventName: 'toUpperLevel',
      name: '上移',
    },
    {
      eventName: 'toLowLevel',
      name: '下移',
    },
    {
      eventName: 'toLevelCenter',
      name: '水平居中',
    },
    {
      eventName: 'toVerticalCenter',
      name: '垂直居中',
    },
    {
      eventName: 'toLevelVerticalCenter',
      name: '水平垂直居中',
    },
    {
      eventName: 'showRefLine',
      name: '一直显示参考线',
    },
    {
      eventName: 'doGroup',
      name: '成组',
    },
    {
      eventName: 'cancelGroup',
      name: '取消成组',
    },
  ];

  const clickTo = eventName => {
    const obj = {
      toTop,
      toBottom,
      toUpperLevel,
      toLowLevel,
      toLevelCenter,
      toVerticalCenter,
      toLevelVerticalCenter,
    };
    const otherObj = {
      showRefLine,
      doGroup,
      cancelGroup,
    };
    if (obj[eventName]) {
      const style = {
        pageWidth,
        pageHeight,
      };
      const { newArr, data } = obj[eventName](clickID, sortCompList, style);
      setUseCompList(newArr);
      updatePageComp({
        id: clickID,
        ...data,
      });
    }
    if (otherObj[eventName]) {
      otherObj[eventName](clickID);
    }
    setVis(false);
  };

  const onMouseLeave = () => {
    setVis(false);
  };



  const _eventArr = eventArr.filter(v => {
    if (hiddenDoGroup && v.eventName === 'doGroup') {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.rightClickDiv} style={{ left, top }} onMouseLeave={onMouseLeave}>
      {_eventArr.map((v, index) => {
        return (
          <div
            key={index}
            onClick={e => {
              e.stopPropagation();
              clickTo(v.eventName);
            }}
            onMouseEnter={() => {
              showHover(v.eventName);
            }}
            className={hoverName === v.eventName ? styles.hoverDiv : {}}
          >
            {v.name}
          </div>
        );
      })}
    </div>
  );
};
