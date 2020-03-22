import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { Input } from 'antd';

class InputColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      setColor: undefined,
    };
    this.inputColor = React.createRef();
  }

  componentDidMount() {
    const { value: propsSetColor } = this.props;
    this.setState({
      setColor: propsSetColor,
    });
  }

  componentDidUpdate() {
    const { setColor } = this.state;
    const { value: propsSetColor } = this.props;
    if (setColor !== propsSetColor) {
      this.setState({
        setColor: propsSetColor,
      });
    }
  }

  inputFocusColor = () => {
    this.setState({ show: true });
  };

  inputColorBlur = () => {
    const { onBlur } = this.props;
    this.setState({ show: false });
    if (onBlur) {
      onBlur();
    }
  };

  onChangeComplete = (color, event) => {
    const { onChange } = this.props;
    this.setState({ setColor: color.hex });
    this.inputFocusColor();
    this.inputColor.current.focus();
    if (onChange) {
      onChange(color.hex);
    }
  };

  // changeInputValue = e => {
  //   console.log('InputColor -> value', e.target.value);
  //   this.setState({ setColor: e.target.value });
  // };

  render() {
    const { color } = this.props;

    return (
      <div style={{ position: 'relative' }}>
        <Input
          allowClear
          ref={this.inputColor}
          value={this.state.setColor}
          onClick={this.inputFocusColor}
          onBlur={this.inputColorBlur}
          // onChange={this.changeInputValue}
          suffix={
            <div style={{ width: 20, height: 20, backgroundColor: color || '#e3e3e3' }}></div>
          }
        />
        {this.state.show && (
          <SketchPicker color={this.state.setColor} onChangeComplete={this.onChangeComplete} />
        )}
      </div>
    );
  }
}

InputColor.propTypes = {};

export default InputColor;
