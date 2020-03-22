import React from 'react';
// import styles from './index.less';
export default props => {
  const { style = {}, width, height } = props;
  const { text = '我是文本' } = style;
  return (
    <div
      style={{
        width: width || 100,
        height: height || 50,
        lineHeight: `${height}px` || '50px',
        color: '#fff',
        ...style,
      }}
    >
      {text}
    </div>
  );
};
