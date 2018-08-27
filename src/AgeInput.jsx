import React, { Component } from 'react';

class AgeInput extends Component {
  render() {
    console.log('render AgeInput');
    return (
      <input
        className="member"
        placeholder="Age input"
        type="text"
        value={this.props.value}
        onChange={this.props.handler}
      />
    );
  }
}

export default AgeInput;
