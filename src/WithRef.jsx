import React, { Component, Fragment } from 'react';
// import { registerRef } from './Former';

const WithRef = (Hocked) =>
  class RefHoc extends Component {
    constructor(props) {
      super(props);
      const { name } = this.props;

      this.refObj = { name, ref: React.createRef() };
    }

    render() {
      return <Hocked {...this.props} ref={this.refObj.ref} refObj={this.refObj} />;
    }
  };

export default WithRef;
