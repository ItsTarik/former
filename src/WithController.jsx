import React, { Component, Fragment } from 'react';

const WithController = (Hocked, ref) =>
  class Controller extends Component {
    constructor(props) {
      super(props);
      this.state = {
        ...props.state,
        isValid: true,
      };
    }

    handler = (event) => {
      if (event.target) event.persist();
      this.setState(({ isValid }) => ({
        [this.props.stateKey]: event.target ? event.target.value : event,
        isValid: !isValid,
      }));
    };

    render() {
      if (this.state.isValid) {
        return (
          <Hocked {...this.props} {...this.state} handler={this.handler} />
        );
      }
      return (
        <Fragment>
          <Hocked {...this.props} {...this.state} handler={this.handler} />
          notValid
        </Fragment>
      );
    }
  };

export default WithController;
