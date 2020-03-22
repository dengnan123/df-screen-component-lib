/**
 * border => 边框素材
 */
import BorderBox from '@/assets/border-2-1.png';
import { filterObj } from '@/helpers/utils';
import { reap } from 'safe-reaper';
import { borderSettingEmus } from '@/helpers/materialconfig';

export default props => {
  const { style } = props;
  const _style = filterObj(style, ('', null, undefined));
  const borderSetting = reap(_style, 'borderSetting', borderSettingEmus['internal']);
  const backgroundColor = reap(_style, 'backgroundColor', 'rgba(23, 151, 191, 0.2)');
  const borderColor = reap(_style, 'borderColor', 'rgb(36, 203, 255)');
  const borderWidth = reap(_style, 'borderWidth', 2);
  const filter = reap(_style, 'filter', 0);


  const borderNone = {
    backgroundClip: 'padding-box',
    filter: 'blur(0px)',
    backgroundColor,
    height: '100%',
  };
  const borderSimple = {
    backgroundClip: 'padding-box',
    filter: `blur(${filter}px)`,
    borderWidth,
    borderStyle: 'solid',
    height: '100%',
    borderColor,

    backgroundColor,
  };
  const borderInternal = {
    backgroundClip: 'padding-box',
    filter: 'blur(0px)',
    borderWidth: '10px',
    borderStyle: 'solid',
    borderImageSource: `url(${BorderBox})`,
    borderImageSlice: '10 fill',
    height: '100%',
    backgroundColor,
  };
  const borderCustomize = {
    backgroundClip: 'padding-box',
    filter: 'blur(0px)',
    borderWidth: '10px',
    borderStyle: 'solid',
    borderImageSource: 'url(undefined)',
    borderImageSlice: '10 fill',
    height: '100%',
    backgroundColor,
  };

  const allStyle = {
    [borderSettingEmus['none']]: borderNone,
    [borderSettingEmus['simple']]: borderSimple,
    [borderSettingEmus['internal']]: borderInternal,
    [borderSettingEmus['customize']]: borderCustomize,
  };
  const finallyStyle = allStyle[borderSetting];

  return (
    <div style={{ width: '100%', height: '100%', padding: 10 }}>
      <div
        style={finallyStyle}
        // style={{
        // ...style,
        // ...borderCustomize,
        // borderImageSource: `url(${BorderBox})`,
        // borderImageSlice: '10 fill',
        // borderWidth: 10,
        // height: '100%',
        // borderStyle: 'solid',
        // backgroundClip: 'padding-box',
        // filter: 'blur(0px)',
        // }}
      ></div>
    </div>
  );
};
