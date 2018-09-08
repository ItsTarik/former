import React, { Component, Fragment } from 'react';
import './HilightRender.css';

class HilightRender extends Component {
  constructor() {
    super();
    this.debugRef = React.createRef();
  }

  componentWillUpdate() {
    this.debugRef.current.classList.remove('debug');
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.debugRef.current.classList.add('debug');
    }, 100);
  }

  render() {
    return (
      <div className={`debug children__width`} ref={this.debugRef}>
        {this.props.children}
      </div>
    );
  }
}

export default HilightRender;
