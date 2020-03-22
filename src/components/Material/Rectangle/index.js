/**
 * Rectangle => 矩形素材
*/

import { reap } from 'safe-reaper';
import { filterObj } from '@/helpers/utils';

export default props => {
  const { style } = props;
  const _style = filterObj(style, ['', null, undefined]);

  const rotate = reap(_style, 'rotate', 0);
  const border = `${_style.borderWidth}px solid ${_style.borderColor}`;
  const data = {
    ..._style,
    transform: `rotate(${rotate}deg)`,
    border,
  };
  return <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', ...data }}></div>;
};
