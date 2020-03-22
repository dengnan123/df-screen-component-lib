import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

const dataSource1 = [
  { key: '1', floor: 23, deskNumber: '12', roomNumber: '10', usageRate: '80%' },
  { key: '2', floor: 24, deskNumber: '11', roomNumber: '11', usageRate: '90%' },
  { key: '2', floor: 24, deskNumber: '11', roomNumber: '11', usageRate: '90%' },
  { key: '2', floor: 24, deskNumber: '11', roomNumber: '11', usageRate: '90%' },
];

const columns1 = [
  { title: '楼层', dataIndex: 'floor', key: 'floor' },
  { title: '工位数', dataIndex: 'deskNumber', key: 'deskNumber' },
  { title: '会议室数', dataIndex: 'roomNumber', key: 'roomNumber' },
  { title: '平均使用率', dataIndex: 'usageRate', key: 'usageRate' },
];

/**
 * width，height @public 宽，高 {number}
 * theadFontSize  @public tbodyFontSize 字体大小 {number}
 * theadColor, thbodyColor @public 字体颜色 {string,十六进制}
 * columns @public 表头数据 {array}
 * dataSource @public 表格数据 {array}
 * evenBgColor, oddBgColor @public 循环间隔颜色 {string, 十六进制}
 *
 */

class AutoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      width,
      height,
      theadFontSize,
      tbodyFontSize,
      theadColor,
      thbodyColor,
      theadBgColor,
      oddBgColor,
      evenBgColor,
      columns = columns1,
      dataSource = dataSource1,
    } = this.props;
    // console.log("AutoTable -> render -> this.props", this.props)
    
    const rowNumber = dataSource.length + 1; // 分列行数
    const rowHeight = height / rowNumber; // 分列每行高
    const odd = oddBgColor || '#b9c3d911'; // 单数行背景颜色
    const enent = evenBgColor || '#0e1c32fa'; // 双数行背景色

    return (
      <div>
        <table style={{ width, height }} className={styles.table}>
          <thead
            style={{
              fontSize: theadFontSize || 15,
              color: theadColor || '#9598a5',
              backgroundColor: theadBgColor || '#0e1c32fa',
            }}
          >
            <tr>
              {columns.map((item, index) => {
                return (
                  <th style={{ minWidth: 50 }} key={index}>
                    {item.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody ref={this.tableBody}>
            {dataSource.map((dataitem, sourceindex) => {
              return (
                <tr
                  key={sourceindex}
                  style={{
                    height: rowHeight,
                    color: thbodyColor || '#fff',
                    fontSize: tbodyFontSize || 13,
                    backgroundColor: `${sourceindex % 2 === 0 ? odd : enent}`,
                  }}

                  // className={sourceindex % 2 === 0 ? styles.odd : styles.even}
                >
                  {columns.map((colItem, colIndex) => {
                    return <td key={colIndex}>{dataitem[colItem.dataIndex]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

AutoTable.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  columns: PropTypes.array,
  dataSource: PropTypes.array,
  theadFontSize: PropTypes.number,
  tbodyFontSize: PropTypes.number,
  theadColor: PropTypes.string,
  thbodyColor: PropTypes.string,
  theadBgColor: PropTypes.string,
  oddBgColor: PropTypes.string,
  evenBgColor: PropTypes.string,
};

export default AutoTable;
